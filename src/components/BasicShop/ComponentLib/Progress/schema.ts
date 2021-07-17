import {
  NumberConfigType,
  RadioConfigType,
  SelectConfigType,
  NumberDefaultType,
  RadioDefaultType,
  SelectRangType,
} from '@/core/FormComponents/types'
import { baseConfig, baseDefault, BaseDefaultType } from '@/components/BasicShop/common'

export type ProgressSelectKeyType = 'success' | 'warning' | 'danger'

export type ProgressRadiotKeyType = 'circle' | 'line' | 'semi-circle'

export type ProgressEditDataType = Array<
  | SelectConfigType<ProgressSelectKeyType>
  | RadioConfigType<ProgressRadiotKeyType>
  | NumberConfigType
>
export interface ProgressConfigType extends BaseDefaultType {
  theme: SelectRangType<ProgressSelectKeyType>
  shape: RadioDefaultType<ProgressRadiotKeyType>
  size: NumberDefaultType
  zIndex: NumberDefaultType
  percent: NumberDefaultType
  strokeWidth: NumberDefaultType
}

export interface ProgressSchema {
  editData: ProgressEditDataType
  config: ProgressConfigType
}

const Progress: ProgressSchema = {
  editData: [
    ...baseConfig,
    {
      key: 'theme',
      name: '主题',
      type: 'Select',
      range: [
        {
          key: 'success',
          text: '成功',
        },
        {
          key: 'warning',
          text: '警告',
        },
        {
          key: 'danger',
          text: '危险',
        },
      ],
      belong: 'config',
    },
    {
      key: 'shape',
      name: 'Shape',
      type: 'Radio',
      range: [
        {
          key: 'circle',
          text: 'Circular',
        },
        {
          key: 'line',
          text: 'Linear',
        },
        {
          key: 'semi-circle',
          text: 'Semicircle',
        },
      ],
      belong: 'config',
    },
    {
      key: 'size',
      name: 'Size',
      type: 'Number',
      belong: 'config',
    },
    {
      key: 'percent',
      name: 'Progress value',
      type: 'Number',
      range: [0, 100],
      belong: 'config',
    },
    {
      key: 'strokeWidth',
      name: 'Thickness',
      type: 'Number',
      belong: 'config',
    },
  ],
  config: {
    theme: 'success',
    shape: 'circle',
    size: 200,
    zIndex: 1,
    percent: 30,
    strokeWidth: 10,
    ...baseDefault,
  },
}

export default Progress
