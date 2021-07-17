import {
  NumberDefaultType,
  TextDefaultType,
  TableDefaultType,
  CollapseConfigType,
} from '@/core/FormComponents/types'
import {
  baseConfig,
  BaseConfigType,
  baseDefault,
  BaseDefaultType,
  getBaseDataConfig,
  BaseDataConfigType,
  baseDataDefault,
  BaseDataDefaultType,
  legendConfig,
  legendDefault,
  LegendDefaultType,
} from '@/components/BasicShop/common'

export type CowEyeEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface CowEyeConfigType extends BaseDefaultType, BaseDataDefaultType, LegendDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  data: TableDefaultType
  radius: NumberDefaultType
  lineWidth: NumberDefaultType
  lineLength: NumberDefaultType
  textOffset: NumberDefaultType
  textColor: TextDefaultType
  multiColor: TextDefaultType[]
}

export interface CowEyeSchema {
  editData: CowEyeEditDataType
  config: CowEyeConfigType
}

const CowEye: CowEyeSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    ...legendConfig,
    {
      key: 'cowEye Set',
      name: 'CowEye set',
      type: 'Collapse',
      range: [
        {
          key: 'radius',
          name: 'Chart Radius',
          type: 'Number',
          range: [0, 1],
          step: 0.05,
          belong: 'config',
        },
        {
          key: 'lineWidth',
          name: 'Line width',
          type: 'Number',
          range: [1, Infinity],
          step: 1,
          belong: 'config',
        },
        {
          key: 'lineLength',
          name: 'Line length',
          type: 'Number',
          range: [1, Infinity],
          step: 1,
          belong: 'config',
        },
        {
          key: 'textOffset',
          name: 'Text offset',
          type: 'Number',
          range: [1, Infinity],
          step: 1,
          belong: 'config',
        },
      ],
      belong: 'config',
    },
    {
      key: 'customColor',
      name: 'Custom color',
      type: 'Collapse',
      range: [
        {
          key: 'textColor',
          name: 'Text color',
          type: 'Color',
          belong: 'config',
        },
        {
          key: 'multiColor',
          name: 'Color',
          type: 'MultiColor',
          belong: 'config',
        },
      ],
      belong: 'config',
    },
  ],
  config: {
    ...baseDefault,
    ...baseDataDefault,
    ...legendDefault,
    width: 200,
    height: 200,
    zIndex: 1,
    layerName: '牛眼图',
    radius: 0.6,
    lineWidth: 1,
    lineLength: 5,
    textOffset: 8,
    textColor: 'rgba(188,200,212,1)',
    multiColor: ['rgba(91, 143, 249, 1)', 'rgba(101, 120, 155, 1)', 'rgba(97, 221, 170, 1)', 'rgba(255,255,0,1)'],
    data: [
      {
        name: 'A',
        value: 25,
      },
      {
        name: 'B',
        value: 66,
      },
      {
        name: 'C',
        value: 22,
      },
      {
        name: 'D',
        value: 28,
      },
    ],
  },
}

export default CowEye
