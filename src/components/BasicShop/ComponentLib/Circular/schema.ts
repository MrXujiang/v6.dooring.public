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

export type CircularEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface CircularConfigType extends BaseDefaultType, BaseDataDefaultType, LegendDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  text: TextDefaultType
  unit: TextDefaultType
  fontSize: NumberDefaultType
  radius: NumberDefaultType
  innerRadius: NumberDefaultType
  labelColor: TextDefaultType
  textColor: TextDefaultType
  axisColor: TextDefaultType
  multiColor: TextDefaultType[]
  data: TableDefaultType
}

export interface CircularSchema {
  editData: CircularEditDataType
  config: CircularConfigType
}

const Circular: CircularSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    ...legendConfig,
    {
      key: 'circular Set',
      name: 'Circular set',
      type: 'Collapse',
      range: [
        {
          key: 'text',
          name: 'Text content',
          type: 'Text',
          belong: 'config',
        },
        {
          key: 'unit',
          name: 'Unit',
          type: 'Text',
          belong: 'config',
        },
        {
          key: 'fontSize',
          name: 'Font size',
          type: 'Number',
          belong: 'config',
        },
        {
          key: 'radius',
          name: 'Chart Radius',
          type: 'Number',
          range: [0, 1],
          step: 0.05,
          belong: 'config',
        },
        {
          key: 'innerRadius',
          name: 'InnerRadius',
          type: 'Number',
          range: [0, 1],
          step: 0.05,
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
          key: 'labelColor',
          name: 'Label color',
          type: 'Color',
          belong: 'config',
        },
        {
          key: 'axisColor',
          name: 'Axis color',
          type: 'Color',
          belong: 'config',
        },
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
    layerName: '饼图',
    width: 200,
    height: 200,
    zIndex: 1,
    text: '文本内容',
    unit: '个',
    fontSize: 14,
    radius: 0.75,
    innerRadius: 0.6,
    labelColor: 'rgba(188,200,212,1)',
    axisColor: 'rgba(188,200,212,1)',
    textColor: 'rgba(188,200,212,1)',
    multiColor: ['rgba(255,255,0,1)', 'rgba(91, 143, 249, 1)', 'rgba(97, 221, 170, 1)', 'rgba(101, 120, 155, 1)'],
    data: [
      {
        name: 'A',
        value: 2,
      },
      {
        name: 'B',
        value: 30,
      },
      {
        name: 'C',
        value: 58,
      },
      {
        name: 'D',
        value: 10,
      },
    ],
  },
}

export default Circular
