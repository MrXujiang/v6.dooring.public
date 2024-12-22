import React, { memo, useEffect } from 'react'
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'

import { RadarConfigType } from './schema'

const { DataView } = DataSet

interface RadarComponentProps extends RadarConfigType {
  id: string
}

const RadarComponent: React.FC<RadarComponentProps> = ({
  id, data, width, height,
  toggle, legendPosition, legendLayout, legendShape,
  radius, coordinate, lineWidth, lineColor, dotWidth, dotColor, graphicsColor, labelColor,
}) => {
  useEffect(() => {
      const dataX = data.map(item => ({ ...item, value: Number(item.value) }))

      const dv = new DataView().source(dataX)

      dv.transform({
        type: 'fold',
        fields: ['value'], // 展开字段集
        key: 'n', // key字段
        value: 'v', // value字段
      })

      const chart = new Chart({
        container: `radar-${id}`,
        autoFit: true,
        width,
        height,
      })

      chart.data(dv.rows)

      chart.legend(
        toggle
          ? {
            position: legendPosition,
            layout: legendLayout,
            marker: {
              symbol: legendShape,
            },
          }
          : false,
      )

      chart.tooltip({
        showCrosshairs: true,
        crosshairs: {
          line: {
            style: {
              lineDash: [4, 4],
              stroke: '#333',
            },
          },
        },
      })

      chart.coordinate('polar', { radius })

      chart.scale('v', { min: 0 })

      chart.axis('name', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
        label: {
          style: {
            fill: labelColor,
          },
        },
      })
      chart.axis('v', coordinate === 'square'
        ? {
          line: null,
          tickLine: null,
          grid: {
            line: {
              type: 'line',
              style: {
                lineDash: null,
              },
            },
          },
        }
        : {})

      chart
        .line()
        .position('name*v')
        .color('n', lineColor)
        .size(lineWidth)
      chart
        .point()
        .position('name*v')
        .color('name', dotColor)
        .shape('circle')
        .size(dotWidth)
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1,
        })

      chart.area().position('name*v').color('n', graphicsColor)

      chart.interaction('element-active')

      chart.render()
  }, [])

  return <div id={`radar-${id}`} />
}

export default memo(RadarComponent)
