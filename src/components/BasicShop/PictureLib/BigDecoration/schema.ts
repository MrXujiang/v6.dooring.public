import {
  NumberDefaultType,
  TextDefaultType,
  DataConfigType,
  RadioConfigType,
  TextAreaConfigType,
  DataType,
  ApiMethod,
} from '@/core/FormComponents/types'
import {
  BaseConfigType,
  BaseDefaultType,
} from '@/components/BasicShop/common'

import publicConfig from '../publicSchema'

export type PictureEditData = Array<
  BaseConfigType | DataConfigType | RadioConfigType<DataType | ApiMethod> | TextAreaConfigType
>

export interface PictureConfig extends BaseDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
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
    layerName: '装饰',
    width: 350,
    height: 150,
    opacity: 1,
  },
}
export default Picture
