import {
  ColorConfigType,
  ColorDefaultType,
  NumberDefaultType,
  SelectConfigType,
  TextDefaultType,
  TextAlignType,
  FontBoldType,
  CollapseConfigType,
  SwitchDefaultType,
} from '@/core/FormComponents/types'
import {
  baseConfig,
  BaseConfigType,
  baseDefault,
  BaseDefaultType,
} from '@/components/BasicShop/common'

export type TextEditData = Array<
  BaseConfigType | ColorConfigType | SelectConfigType<TextAlignType | FontBoldType> | CollapseConfigType
>

export interface TextConfig extends BaseDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  text: TextDefaultType
  color: ColorDefaultType
  background: TextDefaultType
  fontSize: NumberDefaultType
  fontWeight: FontBoldType
  textAlign: TextAlignType
  toggle: SwitchDefaultType
  target: TextDefaultType
  href: TextDefaultType
}

export interface TextSchema {
  editData: TextEditData
  config: TextConfig
}
const Text: TextSchema = {
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
          key: 'fontWeight',
          name: 'Font bold',
          type: 'Select',
          range: [
            {
              key: 'lighter',
              text: 'Finer font',
            },
            {
              key: 'normal',
              text: 'Normal font',
            },
            {
              key: 'bold',
              text: 'Coarser font',
            },
            {
              key: 'bolder',
              text: 'Coarse font',
            },
          ],
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
      key: 'linkSet',
      name: 'Link set',
      type: 'Collapse',
      range: [
        {
          key: 'toggle',
          name: 'Enable',
          type: 'Switch',
          belong: 'config',
        },
        {
          key: 'target',
          name: 'Open mode',
          type: 'Radio',
          range: [
            {
              key: '_self',
              text: 'This window',
            },
            {
              key: '_blank',
              text: 'New window',
            },
          ],
          belong: 'config',
          toggle: true,
        },
        {
          key: 'href',
          name: 'Link address',
          type: 'Text',
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
        {
          key: 'background',
          name: 'BackgroundColor',
          type: 'Color',
          belong: 'config',
        },
      ],
      belong: 'config',
    },
  ],
  config: {
    ...baseDefault,
    layerName: '文本框',
    width: 200,
    height: 20,
    zIndex: 1,
    text: '文本内容',
    color: 'rgba(255,255,255,1)',
    background: 'rgba(0,0,0,1)',
    fontSize: 18,
    fontWeight: 'lighter',
    textAlign: 'center',
    toggle: true,
    target: '_blank',
    href: '/example',
  },
}
export default Text
