import React, { memo } from 'react'
import { Carousel, Image } from 'antd'
import Banner from '@/assets/slide.svg'

import { imgLoadFail } from '@/utils'

import { SlideshowConfig } from './schema'

interface SlideshowConfigType extends SlideshowConfig {
  isTpl: boolean
}

const Slideshow: React.FC<SlideshowConfigType> = memo(({
  width, height, isTpl, dots, autoplay, effect, dotPosition, data,
}) => {
  return (
    <>
      {isTpl
        ? <Image
          preview={false}
          width={50}
          height={50}
          src={Banner}
          alt="image"
          fallback={imgLoadFail}
        />
        : (
          <Carousel
            dots={dots}
            autoplay={autoplay}
            dotPosition={dotPosition}
            effect={effect}
          >
            {data.map(d => (
              <Image
                key={d.name}
                preview={false}
                width={width}
                height={height}
                src={d.value}
                alt="image"
                fallback={imgLoadFail}
              />
            ))}
          </Carousel>
        )}
    </>
  )
})
export default Slideshow
