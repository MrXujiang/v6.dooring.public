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

export type FunnelEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface FunnelConfigType extends BaseDefaultType, BaseDataDefaultType, LegendDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  multiColor: TextDefaultType[]
  data: TableDefaultType
}

export interface FunnelSchema {
  editData: FunnelEditDataType
  config: FunnelConfigType
}

const Funnel: FunnelSchema = {
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
    layerName: '漏斗图',
    multiColor: ['rgba(91, 143, 249, 1)', 'rgba(101, 120, 155, 1)', 'rgba(97, 221, 170, 1)', 'rgba(255,255,0,1)'],
    data: [
      {
        name: 'A',
        value: 50000,
      },
      {
        name: 'B',
        value: 35000,
      },
      {
        name: 'C',
        value: 25000,
      },
      {
        name: 'D',
        value: 15000,
      },
      {
        name: 'E',
        value: 8000,
      },
    ],
  },
}

export default Funnel
