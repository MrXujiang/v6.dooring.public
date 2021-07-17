import React, { memo, useCallback } from 'react'

import FormattedMsg from '@/components/FormattedMsg'

import { TextConfig } from './schema'
import styles from '../index.less'

interface TextConfigType extends TextConfig {
  isTpl: boolean
}

const Text: React.FC<TextConfigType> = memo(({
  isTpl, width, height, textAlign, text, fontSize, fontWeight,
  color, background, toggle, href, target,
}) => {
  const link = useCallback(() => {
    window.open(href, target)
  }, [])

  return (
    <>
      {isTpl
        ? (
          <span className={styles.text}>
            <FormattedMsg id="Text box" />
          </span>
        )
        : (
          <div
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
        )}
    </>
  )
})
export default Text
