import {
  ColorConfigType,
  ColorDefaultType,
  NumberDefaultType,
  SelectConfigType,
  TextDefaultType,
  CollapseConfigType,
  TextAlignType,
  ToggleType,
} from '@/core/FormComponents/types'
import {
  baseConfig,
  BaseConfigType,
  baseDefault,
  BaseDefaultType,
} from '@/components/BasicShop/common'

type animationTiming = 'linear' | 'ease' | 'ease-in' | 'ease-out'

export type CarouselEditData = Array<
  BaseConfigType | ColorConfigType | SelectConfigType<TextAlignType | animationTiming> | CollapseConfigType
>

export interface CarouselConfig extends BaseDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  text: TextDefaultType
  color: ColorDefaultType
  fontSize: NumberDefaultType
  textAlign: TextAlignType
  toggle: ToggleType
  rollingSpeed: NumberDefaultType
  animation: TextDefaultType
}

export interface CarouselSchema {
  editData: CarouselEditData
  config: CarouselConfig
}
const Carousel: CarouselSchema = {
  editData: [
    ...baseConfig,
    {
      key: 'textSet',
      name: 'Text set',
      type: 'Collapse',
      range: [
        {
          key: 'text',
          name: 'Text content',
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
          key: 'textAlign',
          name: 'Alignment',
          type: 'Select',
          range: [
            {
              key: 'left',
              text: 'Align left',
            },
            {
              key: 'center',
              text: 'Align center',
            },
            {
              key: 'right',
              text: 'Align right',
            },
          ],
          belong: 'config',
        },
      ],
      belong: 'config',
    },
    {
      key: 'carouselSet',
      name: 'Carousel set',
      type: 'Collapse',
      range: [
        {
          key: 'toggle',
          name: 'Enable',
          type: 'Switch',
          belong: 'config',
        },
        {
          key: 'rollingSpeed',
          name: 'Rolling speed',
          type: 'Number',
          range: [0, Infinity],
          step: 1,
          belong: 'config',
          toggle: true,
        },
        {
          key: 'animation',
          name: 'Animation',
          type: 'Select',
          range: [
            {
              key: 'linear',
              text: 'Linear',
            },
            {
              key: 'ease',
              text: 'Ease',
            },
            {
              key: 'ease-in',
              text: 'EaseIn',
            },
            {
              key: 'ease-out',
              text: 'EaseOut',
            },
          ],
          belong: 'config',
          toggle: true,
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
          key: 'color',
          name: 'Text color',
          type: 'Color',
          belong: 'config',
        },
      ],
      belong: 'config',
    },
  ],
  config: {
    ...baseDefault,
    layerName: '走马灯',
    width: 150,
    height: 30,
    zIndex: 1,
    text: '走马灯内容',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    textAlign: 'center',
    toggle: true,
    rollingSpeed: 7,
    animation: 'linear',
  },
}
export default Carousel
