import React, { useRef, useState, useEffect, memo } from 'react'
import Moveable, { OnDrag, OnResize } from 'react-moveable'
import classnames from 'classnames'

import DynamicEngine from '@/core/DynamicEngine'

import styles from './index.less'

// 画布宽高, 后面通过pageConfig属性传过来
const pageConfig = {
  w: 1440,
  h: 900,
}

interface ItemPointData {
  transform: number[]
  width?: number
  height?: number
}

const EditBox: React.FC<any> = ({
  item, dragStop, onDragStart, onClick, selectedId,
}) => {
  const { id, item: { config: { x, y, width, height, zIndex } } } = item
  const ref = useRef(null)
  const timer = useRef<any>(null)
  const [target, setTarget] = useState<any>()
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const [frame, setFrame] = useState({
    translate: x || y ? [x, y] : [0, 0],
  })

  const [elementGuidelines, setElementGuidelines] = useState<any[]>([])

  const verticalGuidelines = [
    ...new Array(10).fill(0).map((v, i) => Math.ceil((i * pageConfig.h) / 24)),
    pageConfig.h,
  ]

  const horizontalGuidelines = [
    ...new Array(10).fill(0).map((v, i) => Math.ceil((i * pageConfig.w) / 24)),
    pageConfig.w,
  ]

  const updateDragData = (id:string, pointData: ItemPointData, resize?: boolean) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      dragStop && dragStop(id, pointData, resize)
    }, 300)
  }

  // 阻止事件冒泡，用于切换大屏属性设置
  const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onClick(id)
  }

  useEffect(() => {
    setTarget(ref.current)
    setElementGuidelines([...(document.querySelectorAll('.moveItem') as any)])
  }, [])

  // Moveable ref 持有
  const moveableRef = useRef(null);
  useEffect(() => {
    // 更新辅助线
    (moveableRef.current as any)?.updateRect();
    setFrame({
      translate: [x, y]
    });
  }, [x, y, width, height]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={ref}
        className={classnames('moveItem', styles.moveItem, { [styles.isDragging]: isDragging })}
        style={{
          width: width || 200,
          height: height || 100,
          zIndex: zIndex || 1,
          transform: `translate(${x}px, ${y}px)`,
        }}
        onClick={handleItemClick}
      >
        <DynamicEngine {...(item.item as any)} isTpl={false} id={id} />
      </div>
      {
        !!target && (
          <Moveable
            ref={moveableRef}
            target={target}
            draggable={true}
            resizable={selectedId === id}
            elementGuidelines={elementGuidelines}
            throttleDrag={8}
            startDragRotate={0}
            throttleDragRotate={0}
            zoom={selectedId === id ? 1 : 0}
            origin={false}
            snappable={true}
            verticalGuidelines={verticalGuidelines}
            horizontalGuidelines={horizontalGuidelines}
            isDisplaySnapDigit={true}
            snapGap={true}
            snapElement={true}
            snapVertical={true}
            snapHorizontal={true}
            snapCenter={true}
            snapDigit={0}
            throttleResize={0}
            bounds={{ left: 0, top: 0, right: pageConfig.w, bottom: pageConfig.h }}
            padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
            onDragStart={({ set }) => {
              setIsDragging(true)
              onDragStart(id)
              set(frame.translate)
            }}
            onDrag={({ target, beforeTranslate }: OnDrag) => {
              frame.translate = beforeTranslate
              target!.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
              updateDragData(id, { transform: beforeTranslate })
            }}
            onDragEnd={() => {
              setIsDragging(false)
            }}
            onResizeStart={({ setOrigin, dragStart }) => {
              setOrigin(['%', '%'])
              dragStart && dragStart.set(frame.translate)
            }}
            onResize={({
              target, width, height, drag,
            }: OnResize) => {
              const beforeTranslate = drag.beforeTranslate
              frame.translate = beforeTranslate
              target.style.width = `${width}px`
              target.style.height = `${height}px`
              target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
              updateDragData(id, { transform: beforeTranslate, width, height }, true)
            }}
          />
        )
      }
    </div>
  )
}

export default memo(EditBox)
