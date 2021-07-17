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

export type HexagonalMapEditDataType = Array<
  BaseConfigType | BaseDataConfigType
>

export interface HexagonalMapConfigType extends BaseDefaultType, BaseDataDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
}

export interface HexagonalMapSchema {
  editData: HexagonalMapEditDataType
  config: HexagonalMapConfigType
}

const HexagonalMap: HexagonalMapSchema = {
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
    layerName: '六边形地图',
  },
}

export default HexagonalMap
