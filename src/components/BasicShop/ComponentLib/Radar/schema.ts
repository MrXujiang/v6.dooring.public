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

type Coordinate = 'circle' | 'square'

export type RadarEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface RadarConfigType extends BaseDefaultType, BaseDataDefaultType, LegendDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  radius: NumberDefaultType
  coordinate: Coordinate
  lineWidth: NumberDefaultType
  dotWidth: NumberDefaultType
  labelColor: TextDefaultType
  graphicsColor: TextDefaultType
  lineColor: TextDefaultType
  dotColor: TextDefaultType
  data: TableDefaultType
}

export interface RadarSchema {
  editData: RadarEditDataType
  config: RadarConfigType
}

const Radar: RadarSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    ...legendConfig,
    {
      key: 'radar Set',
      name: 'Radar set',
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
          key: 'coordinate',
          name: 'Coordinate',
          type: 'Select',
          range: [
            {
              key: 'circle',
              text: 'Circle',
            },
            {
              key: 'square',
              text: 'Square',
            },
          ],
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
          key: 'graphicsColor',
          name: 'Graphics color',
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
    ...legendDefault,
    width: 200,
    height: 200,
    zIndex: 1,
    layerName: '雷达图',
    radius: 0.7,
    coordinate: 'square',
    lineWidth: 2,
    labelColor: 'rgba(188,200,212,1)',
    graphicsColor: 'rgba(63,149,253,1)',
    lineColor: 'rgba(63,149,253,1)',
    dotColor: 'rgba(63,149,253,1)',
    dotWidth: 4,
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

export default Radar
