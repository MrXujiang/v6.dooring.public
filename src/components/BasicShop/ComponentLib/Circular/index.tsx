import React, { memo, useEffect, useMemo } from 'react'
import { Chart } from '@antv/g2'

import { colors } from '@/components/BasicShop/common'
import { CircularChart } from '@/utils/icon/Icons'

import { CircularConfigType } from './schema'

interface CircularComponentProps extends CircularConfigType {
  isTpl: boolean
  id: string
}

const CircularComponent: React.FC<CircularComponentProps> = ({
  isTpl, id, data, width, height,
  toggle, legendPosition, legendLayout, legendShape,
  text, fontSize, unit, radius, innerRadius, labelColor, axisColor, textColor, multiColor,
  tipEvent,
  titleEvent,
  dataType,
  apiAddress,
  apiMethod,
  apiData,
  refreshTime,
}) => {
  const total = useMemo(() => data.reduce((res, cur) => {
    res += Number(cur.value) || 0
    return res
  }, 0), [])

  useEffect(() => {
    let timer:any = null;
    if (!isTpl) {
      const chart = new Chart({
        container: `circular-${id}`,
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

      chart.axis('value', {
        label: null,
        line: { style: { stroke: axisColor } },
        tickLine: null,
      })

      chart.coordinate('theta', {
        radius,
        innerRadius,
      })

      chart
        .annotation()
        .text({
          position: ['50%', '50%'],
          content: text,
          style: {
            fontSize,
            fill: textColor,
            textAlign: 'center',
          },
          offsetY: -20,
        })
        .text({
          position: ['50%', '50%'],
          content: String(total),
          style: {
            fontSize,
            fill: textColor,
            textAlign: 'center',
          },
          offsetX: -10,
          offsetY: 20,
        })
        .text({
          position: ['50%', '50%'],
          content: unit,
          style: {
            fontSize,
            fill: textColor,
            textAlign: 'center',
          },
          offsetY: 20,
          offsetX: 20,
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
    }
    return () => {
      clearInterval(timer)
    }
  }, [])
  return isTpl
    ? <CircularChart />
    : <div id={`circular-${id}`} />
}

export default memo(CircularComponent)
