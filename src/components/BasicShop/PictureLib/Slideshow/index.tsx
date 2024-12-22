import React, { memo } from 'react'
import { Carousel, Image } from 'antd'

import { SlideshowConfig } from './schema'

const Slideshow: React.FC<SlideshowConfig> = memo(({
  width, height, dots, autoplay, effect, dotPosition, data,
}) => {
  return <Carousel
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
              />
            ))}
          </Carousel>
})
export default Slideshow
