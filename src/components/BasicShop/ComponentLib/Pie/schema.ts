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

type Shape = 'circle' | 'semicircle' | 'quadrant'

export type PieEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface PieConfigType extends BaseDefaultType, BaseDataDefaultType, LegendDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  radius: NumberDefaultType
  shape: Shape
  labelColor: TextDefaultType
  axisColor: TextDefaultType
  multiColor: TextDefaultType[]
  data: TableDefaultType
}

export interface PieSchema {
  editData: PieEditDataType
  config: PieConfigType
}

const Pie: PieSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    ...legendConfig,
    {
      key: 'pie Set',
      name: 'Pie set',
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
          key: 'shape',
          name: 'Shape',
          type: 'Select',
          range: [
            {
              key: 'circle',
              text: 'Circle',
            },
            {
              key: 'semicircle',
              text: 'Semicircle',
            },
            {
              key: 'quadrant',
              text: 'Quadrant',
            },
          ],
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
    radius: 0.85,
    shape: 'circle',
    labelColor: 'rgba(188,200,212,1)',
    axisColor: 'rgba(188,200,212,1)',
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

export default Pie
