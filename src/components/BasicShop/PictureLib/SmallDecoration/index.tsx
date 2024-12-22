import React, { memo } from 'react'
import { Image } from 'antd'

import { PictureConfig } from './schema'

interface PictureConfigType extends PictureConfig {
  imgname: string
}

const Decoration: React.FC<PictureConfigType> = memo(({
  width, height, opacity, imgname,
}) => {
  const src = require(`@/assets/${imgname}`)

  return <Image
            style={{ opacity }}
            preview={false}
            width={width}
            height={height}
            src={src}
            alt="image"
          />
})
export default Decoration
