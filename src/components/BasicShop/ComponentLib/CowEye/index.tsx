import React, { memo, useEffect } from 'react'
import { Chart, Util } from '@antv/g2'

import { colors } from '@/components/BasicShop/common'
import { PieChart } from '@/utils/icon/Icons'

import { CowEyeConfigType } from './schema'

interface CowEyeComponentProps extends CowEyeConfigType {
  isTpl: boolean
  id: string
}

const CowEyeComponent: React.FC<CowEyeComponentProps> = ({
  isTpl, id, data, width, height,
  toggle, legendPosition, legendLayout, legendShape,
  radius, lineWidth, lineLength, textOffset, textColor, multiColor,
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
    if (!isTpl) {
      const chart = new Chart({
        container: `cowEye-${id}`,
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

      chart.coordinate('polar', {
        radius,
      })

      const interval = chart
        .interval()
        .adjust('stack')
        .position('1*value')
        .color('name', data.map((_, i) => multiColor[i] ? multiColor[i] : colors[i % 7]))
        .state({
          active: {
            style: {
              stroke: null,
              fillOpacity: 0.65,
            },
          },
        })

      chart.interaction('element-active')
      chart.animate(false)

      chart.on('afterrender', () => {
        // label 绘制图层
        const foregroundGroup = chart.foregroundGroup
        let labelGroup = foregroundGroup.findById('customLabels')
        if (labelGroup) {
          (labelGroup as any).clear()
        } else {
          labelGroup = chart.foregroundGroup.addGroup({
            capture: false,
            id: 'customLabels',
          })
        }
        const offset = lineLength // 拐点折线的长度
        const textoffset = textOffset
        const elements = interval.elements
        const coordinate = chart.getCoordinate()
        const center = coordinate.getCenter()
        const radius = coordinate.getRadius()

        const count = elements.length
        let preWidth = 0
        let firstPoint1: any // 第一个 label 的第一个点
        let firstPoint2: any // 第一个 label 的拐点

        for (let i = 0; i < count; i++) {
          const label = (labelGroup as any).addGroup()
          const element = elements[i]
          const originData = element.getData()
          const mappingData = element.getModel()
          if (i === count - 1) {
            // 最后一个图形 label 横着长
            label.addShape('path', {
              attrs: {
                path: [
                  ['M', center.x, center.y],
                  ['L', center.x + radius + offset, center.y],
                ],
                stroke: mappingData.color,
                lineWidth,
              },
            })
            label.addShape('text', {
              attrs: {
                x: center.x + radius + offset + textoffset,
                y: center.y,
                text: originData.name + ': ' + originData.value,
                textBaseline: 'middle',
                fill: textColor,
              },
            })
          } else {
            const nextElement = elements[i + 1]
            const nextBBox = nextElement.getBBox()
            const bbox = element.getBBox()
            // 第一个点
            const width = bbox.maxX - nextBBox.maxX
            const pointRadius = radius - preWidth - (width / 2)
            const point1 = Util.polarToCartesian(center.x, center.y, pointRadius, -3 * Math.PI / 8 + (Math.PI / 8) * i)
            let point2
            if (i === 0) {
              point2 = {
                x: bbox.maxX,
                y: bbox.minY,
              }
              firstPoint2 = point2
              firstPoint1 = point1
            } else {
              point2 = {
                x: Math.min(firstPoint2.x + point1.x - firstPoint1.x, elements[0].getBBox().maxX),
                y: firstPoint2.y + point1.y - firstPoint1.y,
              }
            }

            const point3 = {
              x: point2.x + offset,
              y: point2.y,
            }
            label.addShape('path', {
              attrs: {
                path: [
                  ['M', point1.x, point1.y],
                  ['L', point2.x, point2.y],
                  ['L', point3.x, point3.y],
                ],
                stroke: mappingData.color,
                lineWidth,
              },
            })
            label.addShape('text', {
              attrs: {
                x: point3.x + textoffset,
                y: point3.y,
                text: originData.name + ': ' + originData.value,
                textBaseline: 'middle',
                fill: textColor,
              },
            })
            preWidth += width
          }
        }
      })

      chart.render()
    }

    return () => {
      clearInterval(timer)
    }
  }, [])

  return isTpl
    ? <PieChart />
    : <div id={`cowEye-${id}`} />
}

export default memo(CowEyeComponent)
