import React, { memo, useEffect } from 'react'
import { Chart } from '@antv/g2'
import { AreaConfigType } from './schema'

interface AreaComponentProps extends AreaConfigType {
  id: string
}

const AreaComponent: React.FC<AreaComponentProps> = ({
  id, data, width, height,
  toggle, legendPosition, legendLayout,
  labelColor, axisColor, lineColor, grid, lineWidth, areaColor,
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
        container: `area-${id}`,
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

      chart.line().position('name*value').color('value', lineColor).size(lineWidth || 0)
      chart.area().position('name*value').color('value', areaColor)
      chart.render()

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <div id={`area-${id}`} />
}

export default memo(AreaComponent)
