import React, { memo, useCallback, useMemo } from 'react'
import { useDrop } from 'react-dnd'
import { connect, Dispatch } from 'umi'
import { StateWithHistory } from 'redux-undo'
import { Menu, Item, MenuProvider } from 'react-contexify'

import FormattedMsg from '@/components/FormattedMsg'
import { EditorModelState } from '@/pages/editor/models/editorModel'
import ViewEditRender from '@/core/ViewEditRender'
import { uuid } from '@/utils/tool'

import 'react-contexify/dist/ReactContexify.min.css'

import styles from './index.less'

interface SourceBoxProps {
  pstate: EditorModelState
  scaleNum: number
  canvasId: string
  allType: string[]
  dispatch: Dispatch
  dragState: { x: number; y: number }
  setDragState: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >
}

const SourceBox: React.FC<SourceBoxProps> = memo(({
  pstate, canvasId, allType, dispatch, scaleNum,
}) => {
  const pointData = useMemo(() => pstate.pointData, [pstate.pointData])
  const screenData = useMemo(() => pstate.screenData, [pstate.screenData])
  // console.log('pointData: ', pointData)

  const [{ isOver }, drop] = useDrop({
    accept: allType,
    drop: (item: { h: number; type: string; config: any }, monitor) => {
      // 计算落点坐标
      const parentDiv = document.getElementById(canvasId)
      const pointRect = parentDiv!.getBoundingClientRect()
      const left = pointRect.left
      const top = pointRect.top
      const pointEnd = monitor.getSourceClientOffset()
      const x = pointEnd!.x < left ? 0 : pointEnd!.x - left
      const y = pointEnd!.y < top ? 0 : pointEnd!.y - top

      dispatch({
        type: 'editorModel/addPointData',
        payload: {
          id: uuid(6, 10),
          item: { ...item, config: { ...item.config, y, x } },
          status: 'inToCanvas',
        },
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  })

  const moveableEvent = useCallback((id, point) => {
    const curPointData = pointData.filter(item => item.id === id)[0]
    const { item: { config } } = curPointData
    dispatch({
      type: 'editorModel/modPointData',
      payload: {
        ...curPointData,
        item: {
          ...curPointData.item,
          config: {
            ...config,
            y: point.transform[1],
            x: point.transform[0],
            width: point.width || config.width,
            height: point.height || config.height,
          },
        },
        status: 'inToCanvas',
      },
    })
  }, [pointData])

  const dragStop = useCallback((id: string, point: any, resize?: boolean) => {
    if (resize) {
      moveableEvent(id, point)
    } else if (
      point.transform[0] !== 0 ||
      point.transform[1] !== 0 ||
      (point.transform[0] === 0 && point.transform[1] === 0)
    ) {
      moveableEvent(id, point)
    }
  }, [moveableEvent])

  const onDragStart = useCallback((id: string) => {
    if (id !== pstate.curPoint?.id) {
      const curPointData = pointData.filter(item => item.id === id)[0]
      dispatch({
        type: 'editorModel/modPointData',
        payload: { ...curPointData, status: 'inToCanvas' },
      })
    }
  }, [pointData, pstate.curPoint])

  const handleContextMenuDel = () => {
    if (pstate.curPoint) {
      dispatch({
        type: 'editorModel/delPointData',
        payload: { id: pstate.curPoint.id },
      })
    }
  }

  const handleContextMenuCopy = () => {
    if (pstate.curPoint) {
      dispatch({
        type: 'editorModel/copyPointData',
        payload: { id: pstate.curPoint.id },
      })
    }
  }

  const onConTextClick = (type: string) => {
    if (type === 'del') {
      handleContextMenuDel()
    } else if (type === 'copy') {
      handleContextMenuCopy()
    }
  }

  const MyAwesomeMenu = useCallback(
    () => (
      <Menu id="menu_id">
        <Item onClick={() => onConTextClick('copy')}>
          <FormattedMsg id="Copy" />
        </Item>
        <Item onClick={() => onConTextClick('del')}>
          <FormattedMsg id="Delete" />
        </Item>
      </Menu>
    ),
    [onConTextClick],
  )

  const opacity = useMemo(() => isOver ? 0.7 : 1, [isOver])

  const render = useMemo(() => (
    <div className={styles.canvasBox}>
      <MenuProvider id="menu_id">
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: `scale(${scaleNum})`,
          }}
        >
          <div
            id={canvasId}
            className={styles.canvas}
            style={{
              opacity,
              width: screenData.w,
              height: screenData.h,
              backgroundImage: `url(${screenData.bg})`,
            }}
            ref={drop}
          >
            {pointData.length > 0 && (
              <ViewEditRender
                pointData={pointData}
                dragStop={dragStop}
                onDragStart={onDragStart}
              />
            )}
          </div>
        </div>
      </MenuProvider>
    </div>
  ), [dragStop, onDragStart, drop, opacity, pointData, screenData, scaleNum])

  return (
    <>
      {render}
      <MyAwesomeMenu />
    </>
  )
})

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModel,
}))(SourceBox)
