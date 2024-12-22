import React, { memo, useEffect } from 'react'
import { Chart } from '@antv/g2'

import { LineConfigType } from './schema'

interface LineComponentProps extends LineConfigType {
  id: string
}

const LineComponent: React.FC<LineComponentProps> = ({
  id, data, width, height,
  toggle, legendPosition, legendLayout,
  labelColor, axisColor, lineColor, grid, lineWidth, dotWidth, dotColor,
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
        container: `line-${id}`,
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
          }
          : false,
      )

      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        showCrosshairs: true,
      })

      chart.scale({
        name: {
          range: [0, 1],
        },
        value: {
          nice: true,
        },
      })

      chart.axis('name', {
        label: { style: { fill: labelColor } },
        line: { style: { stroke: axisColor } },
        tickLine: null,
      })
      chart.axis('value', grid
        ? {
          label: { style: { fill: labelColor } },
          line: { style: { stroke: axisColor } },
        }
        : {
          label: { style: { fill: labelColor } },
          line: { style: { stroke: axisColor } },
          grid: null,
        })

      chart.line().position('name*value').color('value', lineColor).size(lineWidth)
      chart.point().position('name*value').color('value', dotColor).size(dotWidth)
      chart.render()
    return () => {
      clearInterval(timer)
    }
  }, [data])

  return <div id={`line-${id}`} />
}

export default memo(LineComponent)
