import {
  NumberDefaultType,
  TextDefaultType,
} from '@/core/FormComponents/types'
import {
  BaseDefaultType,
} from '@/components/BasicShop/common'

import publicConfig, { PictureEditData } from '../publicSchema'

import source1 from '@/assets/source1.png'

export interface PictureConfig extends BaseDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  src: TextDefaultType
  zIndex: NumberDefaultType
  opacity: NumberDefaultType
}

export interface PictureSchema {
  editData: PictureEditData
  config: PictureConfig
}
const Picture: PictureSchema = {
  editData: [
    ...publicConfig.editData,
  ],
  config: {
    ...publicConfig.config,
    layerName: '图片',
    width: 150,
    height: 150,
    src: source1,
    opacity: 1,
    zIndex: 1,
  },
}
export default Picture
