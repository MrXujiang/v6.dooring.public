import React, { useState, useMemo, useCallback, useEffect, useContext } from 'react'
import { Spin, Collapse, Image } from 'antd'
import { StateWithHistory } from 'redux-undo'
import { throttle } from 'lodash'
import { connect, Dispatch } from 'umi'
import classnames from 'classnames'
import { EyeOutlined, DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons'

// import DynamicEngine from '@/core/DynamicEngine'
import FormRender from '@/core/FormRender'
import allTemplate from '@/components/BasicShop/template'
// import Schema from '@/components/BasicShop/schema'
import FormattedMsg from '@/components/FormattedMsg'
import Calibration from '@/components/Calibration'
import CanvasControl from '@/components/CanvasControl'
import { EditorModelState, PointDataType } from '@/pages/editor/models/editorModel'
import { BarChartIcon, PictureIcon, TextIcon } from '@/utils/icon/Icons'
import { IntlContext } from '@/utils/context/intl'
import { canvasWidth, canvasHeight } from '@/utils'

import HeaderComponent from './components/Header'
import SourceBox from './SourceBox'
import TargetBox from './TargetBox'

import styles from './index.less'

const { Panel } = Collapse

interface ContainerProps {
  pstate: EditorModelState
  dispatch: Dispatch
  location: any
}

const Container: React.FC<ContainerProps> = ({
  dispatch, pstate, location,
}) => {
  const formatMsg = useContext<any>(IntlContext)
  const pointData = useMemo(() => pstate.pointData, [pstate.pointData])
  const curPoint = useMemo(() => pstate.curPoint, [pstate.curPoint])
  const screenConfig = useMemo(() => pstate.screenConfig, [pstate.screenConfig])
  const screenData = useMemo(() => pstate.screenData, [pstate.screenData])

  const canvasId = useMemo(() => 'js_canvas', [])

  const [dragstate, setDragState] = useState<{x: number, y: number}>({ x: 0, y: 0 })
  const [scaleNum, setScale] = useState(1)
  const [curTab, setTab] = useState<string>('component')
  const [top, setTop] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)
  const [rightColla, setRightColla] = useState(false)

  const changeTab = useCallback(tab => {
    setTab(tab)
  }, [])

  const handleFormSave = useCallback((data: any) => {
    dispatch({
      type: 'editorModel/modPointData',
      payload: {
        ...curPoint,
        item: { ...(curPoint as PointDataType).item, config: data },
      },
    })
  }, [curPoint])

  const handleScreenSave = useCallback((data: any) => {
    dispatch({
      type: 'editorModel/modScreenData',
      payload: data,
    })
  }, [])

  const clearCurPoint = useCallback(() => {
    if (curPoint) {
      dispatch({ type: 'editorModel/clearCurPoint' })
    }
  }, [curPoint])

  const allType = useMemo(() => {
    const arr: string[] = []
    allTemplate.component.forEach(v => {
      arr.push(v.type)
    })
    allTemplate.picture.forEach(v => {
      arr.push(v.type)
    })
    allTemplate.text.forEach(v => {
      arr.push(v.type)
    })
    return arr
  }, [])

  const handleSlider = useMemo(() => {
    return (type:string) => {
      if (type) {
        setScale((prev) => +(prev + 0.1).toFixed(1))
      } else {
        setScale((prev) => +(prev - 0.1).toFixed(1))
      }
    }
  }, [])

  const toggleRightColla = useCallback(() => {
    setRightColla(!rightColla)
  }, [rightColla])

  const tabRender = useMemo(() => {
    switch (curTab) {
    case 'component':
      return allTemplate.component.map((value, i) => {
        const Template = value.icon;
        return (
          <TargetBox item={value} key={i}>
            <Template />
          </TargetBox>
        )
      })
    case 'picture':
      return <>
        { allTemplate.picture.map((value, i) => (
          value.show === 'picture' && 
          <TargetBox item={value} key={i}>
            <Image
              preview={false}
              width={124}
              height={50}
              src={require(`@/assets/${value.imgname}`)}
              alt="V6.Dooring"
              key={i}
            />
          </TargetBox>
        ))}
        <Collapse defaultActiveKey={['1']} ghost expandIconPosition='right' className={styles.decoration}>
          <Panel header={(formatMsg('decoration'))} key="1">
            {
              allTemplate.picture.map((value, i) => (
                value.show === 'decoration' && 
                <TargetBox item={value} key={i}>
                  <Image
                    preview={false}
                    width={124}
                    height={50}
                    src={require(`@/assets/${value.imgname}`)}
                    alt="V6.Dooring"
                    key={i}
                  />
                </TargetBox>
              ))
            }
          </Panel>
        </Collapse>
      </>
    case 'text':
      return allTemplate.text.map((value, i) => {
        return (
          <TargetBox item={value} key={i}>
            <span className={styles.text}>
              <FormattedMsg id={value.type} />
          </span>
          </TargetBox>
        )
      })
    default:
      break
    }
  }, [curTab])

  const renderRight = useMemo(() => (
    <div
      className={classnames(styles.attrSetting, styles.transition)}
      style={{
        transform: rightColla ? 'translate(100%,0)' : 'translate(0,0)',
      }}
    >
      {pointData.length && curPoint
        ? (
          <FormRender
            uid={curPoint.id}
            config={curPoint.item.editableEl}
            defaultValue={curPoint.item.config}
            onSave={handleFormSave}
          />
        )
        : (
          <FormRender
            uid="001"
            config={screenConfig}
            defaultValue={screenData}
            onSave={handleScreenSave}
          />
        )}
    </div>
  ), [pointData.length, curPoint, handleFormSave, screenConfig, screenData, rightColla])

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
    document.querySelector('#calibration')?.addEventListener('scroll', handleScroll)
    return () => {
      document.querySelector('#calibration')?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Spin spinning={pstate.isLoading}>
      <div className={styles.editorWrap}>
        <HeaderComponent
          pointData={pointData}
          screenData={screenData}
          location={location}
        />
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.libs}>
              <div
                className={curTab === 'component' ? styles.active : ''}
                onClick={changeTab.bind(this, 'component')}
              >
                <BarChartIcon />
              </div>
              <div
                className={curTab === 'picture' ? styles.active : ''}
                onClick={changeTab.bind(this, 'picture')}
              >
                <PictureIcon />
              </div>
              <div
                className={curTab === 'text' ? styles.active : ''}
                onClick={changeTab.bind(this, 'text')}
              >
                <TextIcon />
              </div>
            </div>
            <div className={styles.components}>
              {tabRender}
            </div>
          </div>
          <div
            id="calibration"
            className={styles.tickMark}
            onClick={clearCurPoint}
          >
            <div style={{ width: canvasWidth, height: canvasHeight }}>
              <div className={styles.cover}>
                <EyeOutlined style={{ color: '#ffffff', fontSize: 12 }} />
              </div>
              <div
                className={styles.tickMarkTop}
                style={{
                  left: 200 - left,
                  width: canvasWidth,
                }}
              >
                <Calibration direction="up" len={canvasWidth} />
              </div>
              <div
                className={styles.tickMarkLeft}
                style={{
                  top: 40 - top,
                  height: canvasHeight,
                }}
              >
                <Calibration direction="right" len={canvasHeight} />
              </div>
              <SourceBox
                dragState={dragstate}
                setDragState={setDragState}
                canvasId={canvasId}
                allType={allType}
                scaleNum={scaleNum}
              />
              <CanvasControl
                rightColla={rightColla}
                scaleNum={scaleNum}
                handleSlider={handleSlider}
              />
            </div>
          </div>
          {renderRight}
          <div
            className={classnames(styles.rightcolla, styles.transition)}
            style={{ right: rightColla ? 0 : 340 }}
            onClick={toggleRightColla}
          >
            {!rightColla ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </div>
          <div className={styles.transition} style={{ width: rightColla ? 0 : 340 }} />
        </div>
      </div>
    </Spin>
  )
}

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModel,
}))(Container)
