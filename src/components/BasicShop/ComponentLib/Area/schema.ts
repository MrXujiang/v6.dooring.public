import { initial, omit } from 'lodash'

import {
  TextDefaultType,
  NumberDefaultType,
  TableDefaultType,
  CollapseConfigType,
  SwitchDefaultType,
  ToggleType,
  LegendPosition,
  LegendLayout,
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
} from '@/components/BasicShop/common'

export type AreaEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface AreaConfigType extends BaseDefaultType, BaseDataDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  toggle: ToggleType
  legendPosition: LegendPosition
  legendLayout: LegendLayout
  labelColor: TextDefaultType
  axisColor: TextDefaultType
  lineColor: TextDefaultType
  grid: SwitchDefaultType
  lineWidth: NumberDefaultType
  areaColor: TextDefaultType
  data: TableDefaultType
}

export interface AreaSchema {
  editData: AreaEditDataType
  config: AreaConfigType
}

const Area: AreaSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    {
      ...legendConfig[0],
      range: initial(legendConfig[0].range),
    },
    {
      key: 'area Set',
      name: 'Area set',
      type: 'Collapse',
      range: [
        {
          key: 'grid',
          name: 'Grid',
          type: 'Switch',
          belong: 'config',
        },
        {
          key: 'lineWidth',
          name: 'Line width',
          type: 'Number',
          range: [0, Infinity],
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
          key: 'lineColor',
          name: 'Line color',
          type: 'Color',
          belong: 'config',
        },
        {
          key: 'areaColor',
          name: 'Area color',
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
    ...omit(legendDefault, ['legendShape']),
    layerName: '面积图',
    width: 200,
    height: 200,
    zIndex: 1,
    labelColor: 'rgba(188,200,212,1)',
    axisColor: 'rgba(188,200,212,1)',
    lineColor: 'rgba(63,149,253,1)',
    grid: true,
    lineWidth: 2,
    areaColor: 'rgba(63,149,253,1)',
    data: [
      {
        name: 'A',
        value: 20,
      },
      {
        name: 'B',
        value: 60,
      },
      {
        name: 'C',
        value: 20,
      },
      {
        name: 'D',
        value: 80,
      },
    ],
  },
}

export default Area
