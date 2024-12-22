import React, { memo } from 'react'

import { CarouselConfig } from './schema'
import styles from './index.less'

const Carousel: React.FC<CarouselConfig> = memo(({
  textAlign, text, fontSize, color, width, height,
  toggle, rollingSpeed, animation,
}) => {
  return <div
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
})
export default Carousel
