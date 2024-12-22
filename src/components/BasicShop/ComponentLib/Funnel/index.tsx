import React, { memo, useEffect } from 'react'
import { Chart } from '@antv/g2'

import { colors } from '@/components/BasicShop/common'

import { FunnelConfigType } from './schema'

interface FunnelComponentProps extends FunnelConfigType {
  id: string
}

const FunnelComponent: React.FC<FunnelComponentProps> = ({
  isTpl, id, data, width, height,
  toggle, legendPosition, legendLayout, legendShape,
  multiColor,
  tipEvent,
  titleEvent,
  dataType,
  apiAddress,
  apiMethod,
  apiData,
  refreshTime,
}) => {
  useEffect(() => {
    let timer:any = null;
      const chart = new Chart({
        container: `funnel-${id}`,
        autoFit: true,
        width,
        height,
      })

      if(dataType === 'dynamic' && apiAddress) {
        const method = apiMethod.toUpperCase()
        const getChartData = () => {
          fetch(apiAddress, { method, [method === 'POST' ? 'body' : '']: apiData }).then(res => res.json()).then(res => {
            if(res) {
              const dataX = res.map(item => ({ ...item, value: Number(item.value) }))
              chart.data(dataX)
              chart.render()
            }else {
              chart.data([])
            }
          })
        }
        // 如果设置了刷新时间
        if(refreshTime > 0 && location.pathname.indexOf('/editor') < 0) {
          timer = setInterval(() => {
            getChartData()
          }, refreshTime)
        }else {
          getChartData()
        }
        
      }else {
        const dataX = data.map(item => ({ ...item, value: Number(item.value) }))
        chart.data(dataX)
      }

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
        showTitle: false,
        showMarkers: false,
      })

      chart
        .coordinate('rect')
        .transpose()
        .scale(1, -1)

      chart.axis(false)

      chart
        .interval()
        .adjust('symmetric')
        .position('name*value')
        .shape('pyramid')
        .color('name', data.map((_, i) => multiColor[i] ? multiColor[i] : colors[i % 7]))

      chart.interaction('element-active')

      chart.render()

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <div id={`funnel-${id}`} />
}

export default memo(FunnelComponent)
