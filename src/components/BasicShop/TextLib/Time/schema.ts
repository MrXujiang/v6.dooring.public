import {
  ColorConfigType,
  ColorDefaultType,
  NumberDefaultType,
  SelectConfigType,
  TextDefaultType,
  TextAlignType,
  FontBoldType,
  CollapseConfigType,
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
  timeColor: ColorDefaultType
  dateColor: ColorDefaultType
  opacity: NumberDefaultType
  backgroundColor: TextDefaultType
  fontSize: NumberDefaultType
  fontWeight: FontBoldType
  justifyContent: TextDefaultType
  alignItems: TextDefaultType
  flexDirection: TextDefaultType
  display: TextDefaultType
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
          key: 'display',
          name: 'Display',
          type: 'Select',
          range: [
            {
              key: 'both',
              text: 'Both show',
            },
            {
              key: 'dateTime',
              text: 'DateTime show',
            },
            {
              key: 'date',
              text: 'Date show',
            },
            {
              key: 'bothTime',
              text: 'BothTime show',
            },
            {
              key: 'time',
              text: 'Time show',
            },
          ],
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
          key: 'flexDirection',
          name: 'FlexDirection',
          type: 'Select',
          range: [
            {
              key: 'row',
              text: 'Row',
            },
            {
              key: 'row-reverse',
              text: 'Row reverse',
            },
            {
              key: 'column',
              text: 'Column',
            },
            {
              key: 'column-reverse',
              text: 'Column reverse',
            },
          ],
          belong: 'config',
        },
        {
          key: 'justifyContent',
          name: 'JustifyContent',
          type: 'Select',
          range: [
            {
              key: 'flex-start',
              text: 'Align left',
            },
            {
              key: 'center',
              text: 'Align center',
            },
            {
              key: 'flex-end',
              text: 'Align right',
            },
            {
              key: 'space-between',
              text: 'Align justified',
            },
            {
              key: 'space-around',
              text: 'Align isometric',
            },
          ],
          belong: 'config',
        },
        {
          key: 'alignItems',
          name: 'AlignItems',
          type: 'Select',
          range: [
            {
              key: 'flex-start',
              text: 'Align left',
            },
            {
              key: 'center',
              text: 'Align center',
            },
            {
              key: 'flex-end',
              text: 'Align right',
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
          key: 'opacity',
          name: 'Opacity',
          type: 'Number',
          range: [0, 1],
          step: 0.1,
          belong: 'config',
        },
        {
          key: 'timeColor',
          name: 'Time color',
          type: 'Color',
          belong: 'config',
        },
        {
          key: 'dateColor',
          name: 'Date color',
          type: 'Color',
          belong: 'config',
        },
        {
          key: 'backgroundColor',
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
    layerName: '时间框',
    width: 300,
    height: 100,
    zIndex: 1,
    timeColor: 'rgba(255,255,255,1)',
    dateColor: 'rgba(255,255,255,1)',
    backgroundColor: 'rgba(0,0,0,1)',
    display: 'both',
    fontSize: 28,
    opacity: 1,
    fontWeight: 'normal',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
}
export default Text
