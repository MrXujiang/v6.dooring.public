import React, { memo, useEffect } from 'react'
import { Chart } from '@antv/g2'

import { colors } from '@/components/BasicShop/common'

import { ChartConfigType } from './schema'

interface ChartComponentProps extends ChartConfigType {
  id: string
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  id, data, width, height,
  toggle, legendPosition, legendLayout, legendShape,
  labelColor, axisColor, multiColor,
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
        container: `chart-${id}`,
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

      chart.scale({
        value: {
          nice: true,
        },
      })

      chart.axis('name', {
        label: { style: { fill: labelColor } },
        line: { style: { stroke: axisColor } },
        tickLine: null,
      })
      chart.axis('value', {
        label: { style: { fill: labelColor } },
        line: { style: { stroke: axisColor } },
      })

      chart
        .interval()
        .adjust('stack')
        .position('name*value')
        .color('name', data.map((_, i) => multiColor[i] ? multiColor[i] : colors[i % 7]))

      chart.interaction('element-active')

      chart.render()

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <div id={`chart-${id}`} />
}

export default memo(ChartComponent)
