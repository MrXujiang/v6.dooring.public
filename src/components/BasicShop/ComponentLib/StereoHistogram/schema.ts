import {
  NumberDefaultType,
  TextDefaultType,
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

export type StereoHistogramEditDataType = Array<
  BaseConfigType | BaseDataConfigType
>

export interface StereoHistogramConfigType extends BaseDefaultType, BaseDataDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
}

export interface StereoHistogramSchema {
  editData: StereoHistogramEditDataType
  config: StereoHistogramConfigType
}

const StereoHistogram: StereoHistogramSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
  ],
  config: {
    ...baseDefault,
    ...baseDataDefault,
    width: 500,
    height: 200,
    zIndex: 1,
    layerName: '立体柱状图',
  },
}

export default StereoHistogram
