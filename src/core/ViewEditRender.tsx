import React, { useState, useCallback } from 'react'

import { PointDataType } from '@/pages/editor/models/editorModel'

import EditBox from './editBox'

interface ViewProps {
  pointData: Array<PointDataType>
  dragStop?: any
  onDragStart?: any
}

const ViewRender: (props: ViewProps) => any = ({
  pointData, dragStop, onDragStart,
}) => {
  const [curSelectedId, setCurSelectedId] = useState('')
  const handleItemClick = useCallback((id:string) => {
    setCurSelectedId(id)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={() => handleItemClick('')}>
      {pointData.map((data: PointDataType) => {
        return (
          <EditBox
            item={data}
            dragStop={dragStop}
            onDragStart={onDragStart}
            key={data.id}
            selectedId={curSelectedId}
            onClick={handleItemClick}
          />
        )
      })}
    </div>
  )
}

export default ViewRender
