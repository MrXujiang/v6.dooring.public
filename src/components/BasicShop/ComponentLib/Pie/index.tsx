import React, { memo, useEffect } from 'react'
import { Chart } from '@antv/g2'

import { colors } from '@/components/BasicShop/common'

import { PieConfigType } from './schema'

interface PieComponentProps extends PieConfigType {
  id: string
}

const PieComponent: React.FC<PieComponentProps> = ({
  id, data, width, height,
  toggle, legendPosition, legendLayout, legendShape,
  radius, shape, labelColor, axisColor, multiColor,
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
        container: `pie-${id}`,
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

      let shapeConfig = {}
      if (shape === 'quadrant') {
        shapeConfig = {
          startAngle: Math.PI,
          endAngle: Math.PI * (3 / 2),
        }
      } else if (shape === 'semicircle') {
        shapeConfig = {
          startAngle: Math.PI,
          endAngle: Math.PI * 2,
        }
      }

      chart.coordinate('theta', {
        radius,
        ...shapeConfig,
      })

      chart.axis('value', {
        label: null,
        line: { style: { stroke: axisColor } },
        tickLine: null,
      })

      chart
        .interval()
        .adjust('stack')
        .position('value')
        .color('name', data.map((_, i) => multiColor[i] ? multiColor[i] : colors[i % 7]))
        .label('name', () => {
          return {
            style: {
              fill: labelColor,
            },
            content: (data) => {
              return `${data.name}: ${data.value}`
            },
          }
        })

      chart.interaction('element-active')

      chart.render()
    return () => {
      clearInterval(timer)
    }
  }, [])
  return <div id={`pie-${id}`} />
}

export default memo(PieComponent)
