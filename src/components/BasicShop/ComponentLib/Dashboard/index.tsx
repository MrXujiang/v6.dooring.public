import React, { memo, useEffect } from 'react'
import { Chart, registerShape } from '@antv/g2'

import { DashboardIcon } from '@/utils/icon/Icons'

import { DashboardConfigType } from './schema'

interface DashboardComponentProps extends DashboardConfigType {
  isTpl: boolean
  id: string
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({
  isTpl, id, data, width, height,
  text, color, fontSize, graphicsColor, cylinderWidth, backgroundColor,
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
      // 自定义Shape 部分
      registerShape('point', 'pointer', {
        draw(cfg, container) {
          const group = container.addGroup()
          const center = (this as any).parsePoint({ x: 0, y: 0 }) // 获取极坐标系下画布中心点
          // 绘制指针
          group.addShape('line', {
            attrs: {
              x1: center.x,
              y1: center.y,
              x2: cfg.x,
              y2: cfg.y,
              stroke: cfg.color,
              lineWidth: 5,
              lineCap: 'round',
            },
          })
          group.addShape('circle', {
            attrs: {
              x: center.x,
              y: center.y,
              r: 9.75,
              stroke: cfg.color,
              lineWidth: 4.5,
              fill: '#fff',
            },
          })

          return group
        },
      })

      const chart = new Chart({
        container: `dashboard-${id}`,
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

      chart.legend(false)

      chart.scale({
        value: {
          min: 0,
          max: 9,
          tickInterval: 1,
        },
      })

      chart
        .coordinate('polar', {
          startAngle: (-9 / 8) * Math.PI,
          endAngle: (1 / 8) * Math.PI,
          radius: 0.75,
        })

      chart.axis('1', false)
      chart.axis('value', {
        line: null,
        label: {
          offset: -36,
          style: {
            fontSize: 18,
            textAlign: 'center',
            textBaseline: 'middle',
          },
        },
        subTickLine: {
          count: 4,
          length: -15,
        },
        tickLine: {
          length: -24,
        },
        grid: null,
      })

      chart
        .point()
        .position('value*1')
        .shape('pointer')
        .color('#1890FF')
        .animate({
          appear: {
            animation: 'fade-in',
          },
        })

      // 绘制仪表盘背景
      chart.annotation().arc({
        top: false,
        start: [0, 1],
        end: [9, 1],
        style: {
          // 底灰色
          stroke: backgroundColor,
          lineWidth: cylinderWidth,
          lineDash: null,
        },
      })

      // 绘制指标
      chart.annotation().arc({
        start: [0, 1],
        end: [data[0].value, 1],
        style: {
          stroke: graphicsColor,
          lineWidth: cylinderWidth,
          lineDash: null,
        },
      })
      // 绘制指标数字
      chart.annotation().text({
        position: ['50%', '85%'],
        content: text,
        style: {
          fontSize,
          fill: color,
          textAlign: 'center',
        },
      })
      chart.annotation().text({
        position: ['50%', '90%'],
        content: `${data[0].value * 10} %`,
        style: {
          fontSize,
          fill: color,
          textAlign: 'center',
        },
        offsetY: 15,
      })

      chart.render()
    }
    return () => {
      clearInterval(timer)
    }
  }, [])

  return isTpl
    ? <DashboardIcon />
    : <div id={`dashboard-${id}`} />
}

export default memo(DashboardComponent)
