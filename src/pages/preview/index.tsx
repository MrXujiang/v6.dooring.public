import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { EyeOutlined } from '@ant-design/icons'
import { StateWithHistory } from 'redux-undo'
import { connect, Dispatch } from 'umi'
import { isArray, throttle } from 'lodash'

import DynamicEngine from '@/core/DynamicEngine'
import { EditorModelState, PointDataType, PointDataItemType } from '@/pages/editor/models/editorModel'
import Calibration from '@/components/Calibration'
import { canvasWidth, canvasHeight } from '@/utils'

import styles from './index.less'

interface PreviewProps {
  pstate: EditorModelState
  dispatch: Dispatch
  location: any
}

const Preview: React.FC<PreviewProps> = ({ pstate, location, dispatch }) => {
  const pointData = useMemo(() => isArray(pstate.pointData) ? pstate.pointData : [], [pstate.pointData])
  const screenData = useMemo(() => pstate.screenData, [pstate.screenData])

  const [top, setTop] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)

  const handleScroll = useCallback(throttle((e:any) => {
    const { scrollTop = 0, scrollLeft = 0 } = e.target
    if (scrollTop !== top || scrollTop === 0) {
      setTop(scrollTop)
    }
    if (scrollLeft !== left || scrollLeft === 0) {
      setLeft(scrollLeft)
    }
  }, 100), [top, left])

  useEffect(() => {
    document.querySelector('#js_calibration')?.addEventListener('scroll', handleScroll)
    return () => {
      document.querySelector('#js_calibration')?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 获取自定义大屏设置
  useEffect(() => {
    const { tid } = location.query
    if (tid) {
      dispatch({
        type: 'editorModel/getv6',
        payload: tid,
      })
    }
  }, [])

  return (
    <div id="js_calibration" className={styles.tickMark}>
      <div style={{ width: canvasWidth, height: canvasHeight }}>
        <div className={styles.cover}>
          <EyeOutlined style={{ color: '#ffffff', fontSize: 12 }} />
        </div>
        <div
          className={styles.tickMarkTop}
          style={{
            left: 0 - left,
            width: canvasWidth,
          }}
        >
          <Calibration direction="up" len={canvasWidth} background="transparent" />
        </div>
        <div
          className={styles.tickMarkLeft}
          style={{
            top: 0 - top,
            height: canvasHeight,
          }}
        >
          <Calibration direction="right" len={canvasHeight} background="transparent" />
        </div>
        <div
          className={styles.canvas}
          style={{
            width: screenData.w,
            height: screenData.h,
            backgroundImage: `url(${screenData.bg})`,
          }}
        >
          {pointData && pointData.map((data: PointDataType) => {
            const { id, item: { config: { x, y, width, height } } } = data
            return (
              <div
                style={{
                  position: 'absolute',
                  display: 'inline-block',
                  width,
                  height,
                  transform: `translate(${x}px, ${y}px)`,
                }}
                key={id}
              >
                <DynamicEngine {...(data.item as PointDataItemType)} isTpl={false} id={id} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModel,
}))(Preview)
