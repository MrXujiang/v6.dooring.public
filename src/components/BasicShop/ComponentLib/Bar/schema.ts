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

export type BarEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface BarConfigType extends BaseDefaultType, BaseDataDefaultType, LegendDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  data: TableDefaultType
  labelColor: TextDefaultType
  axisColor: TextDefaultType
  multiColor: TextDefaultType[]
}

export interface BarSchema {
  editData: BarEditDataType
  config: BarConfigType
}

const Bar: BarSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    ...legendConfig,
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
    layerName: '条形图',
    labelColor: 'rgba(188,200,212,1)',
    axisColor: 'rgba(188,200,212,1)',
    multiColor: ['rgba(97, 221, 170, 1)', 'rgba(97, 221, 170, 1)', 'rgba(97, 221, 170, 1)', 'rgba(97, 221, 170, 1)'],
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

export default Bar
