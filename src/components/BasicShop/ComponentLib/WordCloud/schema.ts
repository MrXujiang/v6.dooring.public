import {
  ColorDefaultType,
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
import { SERVER_URL } from '@/utils'
import { data } from './data'

export type WordCloudEditData = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface WordCloudConfig extends BaseDefaultType, BaseDataDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  color: ColorDefaultType
}

export interface WordCloudSchema {
  editData: WordCloudEditData
  config: WordCloudConfig
}
const WordCloud: WordCloudSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig('Data'),
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
    ...baseDataDefault,
    layerName: '词云',
    width: 600,
    height: 500,
    zIndex: 1,
    color: 'rgba(100,149,237,1)',
    data,
    apiAddress: `${SERVER_URL}/api/v0/l7/mock?filename=wordCloud.json`,
  },
}
export default WordCloud
