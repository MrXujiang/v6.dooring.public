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

export type LineEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface LineConfigType extends BaseDefaultType, BaseDataDefaultType {
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
  dotWidth: NumberDefaultType
  dotColor: TextDefaultType
  data: TableDefaultType
}

export interface LineSchema {
  editData: LineEditDataType
  config: LineConfigType
}

const Line: LineSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    {
      ...legendConfig[0],
      range: initial(legendConfig[0].range),
    },
    {
      key: 'line Set',
      name: 'Line set',
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
          range: [1, Infinity],
          step: 1,
          belong: 'config',
        },
        {
          key: 'dotWidth',
          name: 'Dot width',
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
          key: 'dotColor',
          name: 'Dot color',
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
    layerName: '折线图',
    width: 200,
    height: 200,
    zIndex: 1,
    labelColor: 'rgba(188,200,212,1)',
    axisColor: 'rgba(188,200,212,1)',
    lineColor: 'rgba(63,149,253,1)',
    grid: true,
    lineWidth: 2,
    dotWidth: 4,
    dotColor: 'rgba(63,149,253,1)',
    data: [
      {
        name: 'A',
        value: 23,
      },
      {
        name: 'B',
        value: 66,
      },
      {
        name: 'C',
        value: 27,
      },
      {
        name: 'D',
        value: 85,
      },
    ],
  },
}

export default Line
