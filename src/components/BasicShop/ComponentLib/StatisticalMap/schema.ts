import {
  NumberDefaultType,
  TextDefaultType,
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
import { SERVER_URL } from '@/utils'
import { data } from './data'

export type StatisticalMapEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface StatisticalMapConfigType extends BaseDefaultType, BaseDataDefaultType, LegendDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  background: TextDefaultType
  stroke: TextDefaultType
  lineWidth: NumberDefaultType
  opacity: NumberDefaultType
}

export interface StatisticalMapSchema {
  editData: StatisticalMapEditDataType
  config: StatisticalMapConfigType
}

const StatisticalMap: StatisticalMapSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig('Data'),
    ...legendConfig,
    {
      key: 'StatisticalMap Set',
      name: 'StatisticalMap set',
      type: 'Collapse',
      range: [
        {
          key: 'lineWidth',
          name: 'Line width',
          type: 'Number',
          range: [0.5, Infinity],
          step: 0.5,
          belong: 'config',
        },
        {
          key: 'opacity',
          name: 'Bg opacity',
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
          key: 'background',
          name: 'BackgroundColor',
          type: 'Color',
          belong: 'config',
        },
        {
          key: 'stroke',
          name: 'Line color',
          type: 'Color',
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
    width: 500,
    height: 200,
    zIndex: 1,
    layerName: '统计地图',
    background: 'rgba(255,255,255,1)',
    stroke: 'rgba(204,204,204,1)',
    lineWidth: 1,
    opacity: 0.85,
    data,
    apiAddress: `${SERVER_URL}/api/v0/l7/mock?filename=world.geo.json`,
  },
}

export default StatisticalMap
