import {
  NumberDefaultType,
  TextDefaultType,
  DataConfigType,
  RadioConfigType,
  TextAreaConfigType,
  BgImgConfigType,
  ToggleType,
  DataType,
  ApiMethod,
} from '@/core/FormComponents/types'
import {
  baseConfig,
  BaseConfigType,
  baseDefault,
  BaseDefaultType,
} from '@/components/BasicShop/common'

export type PictureEditData = Array<
    BaseConfigType | DataConfigType | RadioConfigType<DataType | ApiMethod> | TextAreaConfigType | BgImgConfigType
  >

export interface PictureConfig extends BaseDefaultType {
    zIndex: NumberDefaultType
    dataType: ToggleType
    apiAddress: TextDefaultType
    apiMethod: TextDefaultType
    apiData: TextDefaultType
  }

export interface PictureSchema {
    editData: PictureEditData
    config: PictureConfig
  }
const publicConfig: PictureSchema = {
  editData: [
    ...baseConfig,
    {
      key: 'dataType',
      name: 'Data type',
      type: 'Radio',
      range: [
        {
          key: 'static',
          text: 'Static data',
        },
        {
          key: 'dynamic',
          text: 'Dynamic data',
        },
      ],
      belong: 'data',
    },
    {
      key: 'src',
      name: 'Picture',
      type: 'Upload',
      belong: 'data',
      dataType: 'static',
    },
    {
      key: 'apiAddress',
      name: 'Api address',
      type: 'TextArea',
      belong: 'data',
      dataType: 'dynamic',
    },
    {
      key: 'apiMethod',
      name: 'Api method',
      type: 'Radio',
      range: [
        {
          key: 'get',
          text: 'GET',
        },
        {
          key: 'post',
          text: 'POST',
        },
      ],
      belong: 'data',
      dataType: 'dynamic',
    },
    {
      key: 'apiData',
      name: 'Api data',
      type: 'Data',
      belong: 'data',
      dataType: 'dynamic',
    },
    {
      key: 'opacity',
      name: 'Opacity',
      type: 'Number',
      range: [0, 1],
      step: 0.1,
      belong: 'config',
    },
  ],
  config: {
    ...baseDefault,
    dataType: 'static',
    apiAddress: './example',
    apiMethod: 'get',
    apiData: '',
    zIndex: 1,
  },
}
export default publicConfig
