import React, { memo } from 'react'
import { Progress } from 'zarm'
import { BoxPlotOutlined } from '@ant-design/icons'

import { ProgressConfigType } from './schema'

// import styles from '../index.less'

const XProgress: React.FC<ProgressConfigType & { isTpl: boolean }> = memo(({
  theme, size, shape, percent, strokeWidth, isTpl,
}) => {
  return (
    <>
      {isTpl
        ? <BoxPlotOutlined />
        : (
          <div style={{ textAlign: 'center' }}>
            <Progress
              shape={shape}
              size={size}
              percent={percent}
              theme={theme}
              strokeWidth={strokeWidth}
            />
          </div>
        )}
    </>
  )
})

export default XProgress
