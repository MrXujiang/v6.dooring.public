import {
  NumberDefaultType,
  TextDefaultType,
  SwitchDefaultType,
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
import source1 from '@/assets/source1.png'
import source2 from '@/assets/source2.png'

type dotPosition = 'top' | 'bottom' | 'left' | 'right'
type effect = 'fade' | 'scrollx'

export type SlideshowEditData = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface SlideshowConfig extends BaseDefaultType, BaseDataDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  autoplay: SwitchDefaultType
  dots: SwitchDefaultType
  dotPosition: dotPosition
  effect: effect
  data: Array<{name: string, value: string}>
}

export interface SlideshowSchema {
  editData: SlideshowEditData
  config: SlideshowConfig
}
const Slideshow: SlideshowSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    {
      key: 'slideshowSet',
      name: 'Slideshow set',
      type: 'Collapse',
      range: [
        {
          key: 'dots',
          name: 'Dots',
          type: 'Switch',
          belong: 'config',
        },
        {
          key: 'autoplay',
          name: 'Autoplay',
          type: 'Switch',
          belong: 'config',
        },
        {
          key: 'dotPosition',
          name: 'DotPosition',
          type: 'Select',
          range: [
            {
              key: 'top',
              text: 'top',
            },
            {
              key: 'bottom',
              text: 'bottom',
            },
            {
              key: 'left',
              text: 'left',
            },
            {
              key: 'right',
              text: 'right',
            },
          ],
          belong: 'config',
        },
        {
          key: 'effect',
          name: 'Effect',
          type: 'Select',
          range: [
            {
              key: 'scrollx',
              text: 'Scrollx',
            },
            {
              key: 'fade',
              text: 'Fade',
            },
          ],
          belong: 'config',
        },
      ],
      belong: 'config',
    },
  ],
  config: {
    ...baseDefault,
    ...baseDataDefault,
    layerName: '轮播图',
    width: 200,
    height: 200,
    autoplay: true,
    dots: true,
    zIndex: 1,
    dotPosition: 'bottom',
    effect: 'scrollx',
    data: [
      {
        name: 'A',
        value: source1,
      },
      {
        name: 'B',
        value: source2,
      },
    ],
  },
}
export default Slideshow
