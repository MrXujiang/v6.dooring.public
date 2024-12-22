import {
  NumberDefaultType,
  TextDefaultType,
  DataConfigType,
  RadioConfigType,
  TextAreaConfigType,
  DataType,
  ApiMethod,
  SelectConfigType,
  ColorConfigType,
} from '@/core/FormComponents/types'
import {
  baseConfig,
  BaseConfigType,
  baseDefault,
  BaseDefaultType,
} from '@/components/BasicShop/common'

type dotPosition = 'none' | 'solid' | 'dashed' | 'dotted'

export type ShapeEditData = Array<
  BaseConfigType | DataConfigType | RadioConfigType<DataType | ApiMethod> | TextAreaConfigType |
  SelectConfigType<dotPosition> | ColorConfigType
>

export interface ShapeConfig extends BaseDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  opacity: NumberDefaultType
  borderRadius: NumberDefaultType
  borderWidth: NumberDefaultType
  borderStyle: TextDefaultType
  borderColor: TextDefaultType
  backgroundColor: TextDefaultType
}

export interface ShapeSchema {
  editData: ShapeEditData
  config: ShapeConfig
}
const Shape: ShapeSchema = {
  editData: [
    ...baseConfig,
    {
      key: 'opacity',
      name: 'Opacity',
      type: 'Number',
      range: [0, 1],
      step: 0.1,
      belong: 'config',
    },
    {
      key: 'borderRadius',
      name: 'BorderRadius',
      type: 'Number',
      belong: 'config',
    },
    {
      key: 'borderWidth',
      name: 'BorderWidth',
      type: 'Number',
      belong: 'config',
    },
    {
      key: 'borderStyle',
      name: 'BorderStyle',
      type: 'Select',
      range: [
        {
          key: 'none',
          text: 'none',
        },
        {
          key: 'solid',
          text: 'solid',
        },
        {
          key: 'dashed',
          text: 'dashed',
        },
        {
          key: 'dotted',
          text: 'dotted',
        },
      ],
      belong: 'config',
    },
    {
      key: 'borderColor',
      name: 'BorderColor',
      type: 'Color',
      belong: 'config',
    },
    {
      key: 'backgroundColor',
      name: 'BackgroundColor',
      type: 'Color',
      belong: 'config',
    },
  ],
  config: {
    ...baseDefault,
    layerName: '形状',
    width: 150,
    height: 150,
    zIndex: 1,
    opacity: 0.2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(63,149,253,1)',
    borderStyle: 'solid',
    backgroundColor: 'rgba(255,255,255,1)',
  },
}
export default Shape
