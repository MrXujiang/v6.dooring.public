import React, { memo, useCallback } from 'react'

import { TextConfig } from './schema'

const Text: React.FC<TextConfig> = memo(({
  width, height, textAlign, text, fontSize, fontWeight,
  color, background, toggle, href, target,
}) => {
  const link = useCallback(() => {
    window.open(href, target)
  }, [])

  return <div
    style={{
      color,
      textAlign,
      fontSize,
      fontWeight,
      width,
      height,
      lineHeight: height + 'px',
      background,
      cursor: toggle && location.pathname === '/preview' ? 'pointer' : 'move',
    }}
    onClick={toggle && location.pathname === '/preview' ? link : undefined}
  >
    {text}
  </div>
})
export default Text
