import React, { memo, useEffect } from 'react'
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'

import { PopIcon } from '@/utils/icon/Icons'

import { BubbleMapConfigType } from './schema'

interface BubbleMapComponentProps extends BubbleMapConfigType {
  isTpl: boolean
  id: string
}

const BubbleMapComponent: React.FC<BubbleMapComponentProps> = ({
  isTpl, id, width, height,
  background, stroke, bubbleColor, lineWidth, bgOpacity, bubbleOpacity,
}) => {
  useEffect(() => {
    if (!isTpl) {
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json')
        .then(res => res.json())
        .then(mapData => {
          fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/earthquake.json')
            .then(res => {
              return res.json()
            })
            .then(data => {
              const chart = new Chart({
                container: `bubbleMap-${id}`,
                autoFit: true,
                width,
                height,
              })
              chart.scale({
                x: { sync: true },
                y: { sync: true },
              })
              chart.coordinate('rect').reflect('y')
              chart.legend(false)
              chart.axis(false)

              chart.tooltip({
                showTitle: false,
                showMarkers: false,
              })

              const ds = new DataSet()

              const dv = ds.createView('back')
                .source(mapData, {
                  type: 'GeoJSON',
                })
                .transform({
                  type: 'geo.projection',
                  projection: 'geoMercator',
                  as: ['x', 'y', 'centroidX', 'centroidY'],
                })
              const bgView = chart.createView()
              bgView.data(dv.rows)
              bgView.tooltip(false)
              bgView.polygon()
                .position('x*y')
                .style({
                  fill: background,
                  stroke,
                  lineWidth,
                  fillOpacity: bgOpacity,
                })

              // draw the bubble plot
              const userData = ds.createView().source(data)
              userData.transform({
                type: 'map',
                callback: obj => {
                  const projectedCoord = dv.geoProjectPosition([obj.lng * 1, obj.lat * 1], 'geoMercator')
                  obj.x = projectedCoord[0]
                  obj.y = projectedCoord[1]
                  obj.deaths = obj.deaths * 1
                  obj.magnitude = obj.magnitude * 1
                  return obj
                },
              })
              const pointView = chart.createView()
              pointView.data(userData.rows)
              pointView.point()
                .position('x*y')
                .size('deaths', [2, 30])
                .shape('circle')
                .color(bubbleColor)
                .tooltip('date*location*lat*lng*deaths*magnitude')
                .style({
                  fillOpacity: bubbleOpacity,
                })
                .state({
                  active: {
                    style: {
                      lineWidth: 1,
                      stroke: bubbleColor,
                    },
                  },
                })
              pointView.interaction('element-active')
              chart.render()
            })
        })
    }
  }, [])

  return isTpl
    ? <PopIcon />
    : <div id={`bubbleMap-${id}`} />
}

export default memo(BubbleMapComponent)
