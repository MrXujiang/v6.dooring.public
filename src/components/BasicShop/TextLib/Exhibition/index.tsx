import React, { memo } from 'react'
import { ExhibitionConfig } from './schema'

interface ExhibitionConfigType extends ExhibitionConfig {
  isTpl: boolean
}

const Exhibition: React.FC<ExhibitionConfigType> = memo(({
  isTpl, width, height, title, dataNumber, backgroundColor,
}) => {
  return (
    <>
      {isTpl
        ? (
          <div style={{
            width: 140,
            height: 50,
            backgroundColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            数据看板
          </div>
        )
        : (
          <div
            style={{
              width,
              height,
              backgroundColor,
              padding: 16,
              borderRadius: 2,
            }}
          >
            <div
              style={{
                fontSize: 18,
              }}
            >{title}</div>
            <div
              style={{
                fontSize: 28,
              }}
            >{dataNumber}</div>
          </div>
        )}
    </>
  )
})
export default Exhibition
