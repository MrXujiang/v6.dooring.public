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

export type ChartEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface ChartConfigType extends BaseDefaultType, BaseDataDefaultType, LegendDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  data: TableDefaultType
  labelColor: TextDefaultType
  axisColor: TextDefaultType
  multiColor: TextDefaultType[]
}

export interface ChartSchema {
  editData: ChartEditDataType
  config: ChartConfigType
}

const Chart: ChartSchema = {
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
    layerName: '柱状图',
    labelColor: 'rgba(188,200,212,1)',
    axisColor: 'rgba(188,200,212,1)',
    multiColor: ['rgba(91, 143, 249, 1)', 'rgba(91, 143, 249, 1)', 'rgba(91, 143, 249, 1)', 'rgba(91, 143, 249, 1)'],
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

export default Chart
