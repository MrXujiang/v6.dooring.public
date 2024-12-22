import React, { memo } from 'react'
import { Progress } from 'zarm'

import { ProgressConfigType } from './schema'

const XProgress: React.FC<ProgressConfigType> = memo(({
  theme, size, shape, percent, strokeWidth,
}) => {
  return <div style={{ textAlign: 'center' }}>
    <Progress
      shape={shape}
      size={size}
      percent={percent}
      theme={theme}
      strokeWidth={strokeWidth}
    />
  </div>
})

export default XProgress
