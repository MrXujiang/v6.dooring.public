import React, { memo, useEffect } from 'react'
import { Chart } from '@antv/g2'
import { fetchMapData } from '@/utils/req'

import { DisturbancePointFigureConfigType } from './schema'

interface DisturbancePointFigureComponentProps extends DisturbancePointFigureConfigType {
  id: string
}

const DisturbancePointFigureComponent: React.FC<DisturbancePointFigureComponentProps> = ({
  id, width, height,
  toggle, legendPosition, legendLayout, legendShape,
  dataType, data, apiAddress, apiMethod, grid,
  tipEvent,
  titleEvent,
  apiData,
  refreshTime,
}) => {
  const renderCharts = (data: any) => {
    const chart = new Chart({
      container: `disturbancePointFigure-${id}`,
      autoFit: true,
      width,
      height,
    })
    chart.data(data)
    chart.scale('Score', {
      nice: true,
    })
    chart.tooltip({
      showCrosshairs: true,
      crosshairs: {
        type: 'xy',
      },
    })
    chart.legend(toggle
      ? {
        position: legendPosition,
        layout: legendLayout,
        marker: {
          symbol: legendShape,
        },
        reversed: true, // 图例项逆序显示
      }
      : false)
    chart.axis('Score', grid
      ? {}
      : { grid: null })

    // x轴的栅格线居中
    chart.axis('Class', {
      tickLine: null,
      subTickLine: {
        count: 1,
        length: 4,
        style: {
          lineWidth: 1,
          stroke: '#BFBFBF',
        },
      },
      grid: {
        line: {
          style: {
            stroke: '#8C8C8C',
            lineWidth: 1,
            lineDash: [3, 3],
          },
        },
      },
    })
    chart.point().position('Class*Score')
      .color('Grade')
      .adjust('jitter')
      .shape('circle')
      .style({
        opacity: 0.65,
      })
    chart.render()
  }

  useEffect(() => {
    fetchMapData(dataType, data, apiMethod, apiAddress, renderCharts)
  }, [])

  return <div id={`disturbancePointFigure-${id}`} />
}

export default memo(DisturbancePointFigureComponent)
