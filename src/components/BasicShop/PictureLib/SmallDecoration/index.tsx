import React, { memo } from 'react'
import { Image } from 'antd'

import { imgLoadFail } from '@/utils'

import { PictureConfig } from './schema'

interface PictureConfigType extends PictureConfig {
  isTpl: boolean
  imgname: string
}

const Decoration: React.FC<PictureConfigType> = memo(({
  width, height, isTpl, opacity, imgname,
}) => {
  const src = require(`@/assets/${imgname}`)

  return (
    <>
      {isTpl
        ? <Image
          style={{ opacity }}
          preview={false}
          width={50}
          height={50}
          src={src}
          alt="image"
          fallback={imgLoadFail}
        />
        : (
          <Image
            style={{ opacity }}
            preview={false}
            width={width}
            height={height}
            src={src}
            alt="image"
            fallback={imgLoadFail}
          />
        )}
    </>
  )
})
export default Decoration
