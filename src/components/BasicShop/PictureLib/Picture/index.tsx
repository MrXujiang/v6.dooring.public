import React, { memo } from 'react'
import { Image } from 'antd'

import { PictureConfig } from './schema'

interface PictureConfigType extends PictureConfig {
  imgname: string
}

const Picture: React.FC<PictureConfigType> = memo(({
  width, height, opacity, src,
}) => {
  console.log(src)
  return <Image
    style={{ opacity }}
    preview={false}
    width={width}
    height={height}
    src={src}
    alt="image"
  />
})
export default Picture
