import React, { memo, useEffect } from 'react'
import DataSet from '@antv/data-set'
import { Chart, registerShape, Util } from '@antv/g2'

import { fetchMapData } from '@/utils/req'

import { WordCloudConfig } from './schema'

interface WordCloudConfigType extends WordCloudConfig {
  id: string
}

function getTextAttrs(cfg: any) {
  return {
    ...cfg.defaultStyle,
    ...cfg.style,
    fontSize: cfg.data.size,
    text: cfg.data.text,
    textAlign: 'center',
    fontFamily: cfg.data.font,
    fill: cfg.color || cfg.defaultStyle.stroke,
    textBaseline: 'Alphabetic',
  }
}

registerShape('point', 'cloud', {
  draw(cfg: any, container) {
    const attrs = getTextAttrs(cfg)
    const textShape = container.addShape('text', {
      attrs: {
        ...attrs,
        x: cfg.x,
        y: cfg.y,
      },
    })
    if (cfg.data.rotate) {
      Util.rotate(textShape, cfg.data.rotate * Math.PI / 180)
    }
    return textShape
  },
})

const WordCloud: React.FC<WordCloudConfigType> = memo(({
  id, width, height, data,
  dataType, apiMethod, apiAddress,
  color,
}) => {
  const renderCharts = () => {
    const dv = new DataSet.View().source(data)
    const range = dv.range('value')
    const min = range[0]
    const max = range[1]
    dv.transform({
      type: 'tag-cloud',
      fields: ['x', 'value'],
      size: [width, height],
      font: 'Verdana',
      padding: 0,
      timeInterval: 5000, // max execute time
      rotate() {
        let random = ~~(Math.random() * 4) % 4
        if (random === 2) {
          random = 0
        }
        return random * 90 // 0, 90, 270
      },
      fontSize(d) {
        if (d.value) {
          return ((d.value - min) / (max - min)) * (80 - 24) + 24
        }
        return 0
      },
    })
    const chart = new Chart({
      container: `wordCloud-${id}`,
      autoFit: true,
      width,
      height,
    })
    chart.data(dv.rows)
    chart.scale({
      x: { nice: false },
      y: { nice: false },
    })
    chart.legend(false)
    chart.axis(false)
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    })
    chart.coordinate().reflect('x')
    chart.point()
      .position('x*y')
      .color(color)
      .shape('cloud')
      .tooltip('value*category')
    chart.interaction('element-active')
    chart.render()
  }

  useEffect(() => {
    fetchMapData(dataType, data, apiMethod, apiAddress, renderCharts)
  }, [])

  return <div id={`wordCloud-${id}`} />
})
export default WordCloud
