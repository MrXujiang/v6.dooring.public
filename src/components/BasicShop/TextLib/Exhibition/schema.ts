import {
  ColorConfigType,
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

export type ExhibitionEditData = Array<
  BaseConfigType | ColorConfigType | SelectConfigType<TextAlignType | FontBoldType> | CollapseConfigType
>

export interface ExhibitionConfig extends BaseDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  title: TextDefaultType
  dataNumber: NumberDefaultType
  opacity: NumberDefaultType
  backgroundColor: TextDefaultType
}

export interface ExhibitionSchema {
  editData: ExhibitionEditData
  config: ExhibitionConfig
}
const Exhibition: ExhibitionSchema = {
  editData: [
    ...baseConfig,
    {
      key: 'opacity',
      name: 'Opacity',
      type: 'Number',
      range: [0, 1],
      step: 0.1,
      belong: 'config',
    },
    {
      key: 'backgroundColor',
      name: 'BackgroundColor',
      type: 'Color',
      belong: 'config',
    },
    {
      key: 'contentSet',
      name: 'Content set',
      type: 'Collapse',
      range: [
        {
          key: 'title',
          name: 'Text title',
          type: 'Text',
          belong: 'config',
        },
        {
          key: 'dataNumber',
          name: 'Text data',
          type: 'Number',
          belong: 'config',
        },
      ],
      belong: 'config',
    },
  ],
  config: {
    ...baseDefault,
    layerName: '数据看板',
    width: 300,
    height: 100,
    zIndex: 1,
    opacity: 1,
    title: 'H5-dooring',
    dataNumber: 122341,
    backgroundColor: 'rgba(20,214,42,1)',
  },
}
export default Exhibition
