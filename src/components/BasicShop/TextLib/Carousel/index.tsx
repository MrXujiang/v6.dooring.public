import React, { memo } from 'react'

import FormattedMsg from '@/components/FormattedMsg'

import { CarouselConfig } from './schema'
import styles from '../index.less'

interface CarouselConfigType extends CarouselConfig {
  isTpl: boolean
}

const Carousel: React.FC<CarouselConfigType> = memo(({
  textAlign, text, fontSize, color, width, height, isTpl,
  toggle, rollingSpeed, animation,
}) => {
  return (
    <>
      {isTpl
        ? (
          <span className={styles.text}>
            <FormattedMsg id="Carousel" />
          </span>
        )
        : (
          <div
            style={{
              textAlign,
              width,
              height,
              lineHeight: height + 'px',
              overflow: 'hidden',
            }}
          >
            <a
              className={toggle ? styles.carousel : ''}
              style={{
                color,
                fontSize,
                animationTimingFunction: toggle ? animation : undefined,
                animationDuration: toggle ? rollingSpeed + 's' : undefined,
              }}
            >
              {text}
            </a>
          </div>
        )}
    </>
  )
})
export default Carousel
