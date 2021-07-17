import React, { memo } from 'react'

import { ShapeConfig } from './schema'

interface ShapeConfigType extends ShapeConfig {
  isTpl: boolean
}

const Shape: React.FC<ShapeConfigType> = memo(({
  width, height, isTpl, opacity, borderRadius,
  borderWidth, borderColor, borderStyle, backgroundColor,
}) => {
  return (
    isTpl
      ? <div
        style={{
          width: 50,
          height: 50,
          border: '1px solid #3F95FD',
          borderRadius: 2,
        }}
      />
      : <div
        style={{
          width,
          height,
          opacity,
          borderRadius,
          borderWidth,
          borderColor,
          borderStyle,
          backgroundColor,
        }}
      />
  )
})
export default Shape
