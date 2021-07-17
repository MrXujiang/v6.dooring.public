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
} from '@/components/BasicShop/common'
import { data } from './data'

export type BubbleMapEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface BubbleMapConfigType extends BaseDefaultType, BaseDataDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  background: TextDefaultType
  stroke: TextDefaultType
  bubbleColor: TextDefaultType
  lineWidth: NumberDefaultType
  bgOpacity: NumberDefaultType
  bubbleOpacity: NumberDefaultType
}

export interface BubbleMapSchema {
  editData: BubbleMapEditDataType
  config: BubbleMapConfigType
}

const BubbleMap: BubbleMapSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig('Data'),
    {
      key: 'BubbleMap Set',
      name: 'BubbleMap set',
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
          key: 'bgOpacity',
          name: 'Bg opacity',
          type: 'Number',
          range: [0, 1],
          step: 0.05,
          belong: 'config',
        },
        {
          key: 'bubbleOpacity',
          name: 'Bubble opacity',
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
        {
          key: 'bubbleColor',
          name: 'Bubble color',
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
    width: 500,
    height: 200,
    zIndex: 1,
    layerName: '带气泡的地图',
    background: 'rgba(221,221,221,1)',
    stroke: 'rgba(177,177,177,1)',
    bubbleColor: 'rgba(255,47,41,1)',
    lineWidth: 0.5,
    bgOpacity: 0.65,
    bubbleOpacity: 0.45,
    data,
  },
}

export default BubbleMap
