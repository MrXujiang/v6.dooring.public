import {
  NumberDefaultType,
  TextDefaultType,
  CollapseConfigType,
  SwitchDefaultType,
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
import { SERVER_URL } from '@/utils'
import { data } from './data'

export type DisturbancePointFigureEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface DisturbancePointFigureConfigType extends BaseDefaultType, BaseDataDefaultType, LegendDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  grid: SwitchDefaultType
}

export interface DisturbancePointFigureSchema {
  editData: DisturbancePointFigureEditDataType
  config: DisturbancePointFigureConfigType
}

const DisturbancePointFigure: DisturbancePointFigureSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig('Data'),
    ...legendConfig,
    {
      key: 'PointFigure Set',
      name: 'PointFigure set',
      type: 'Collapse',
      range: [
        {
          key: 'grid',
          name: 'Grid',
          type: 'Switch',
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
    width: 500,
    height: 200,
    zIndex: 1,
    layerName: '扰动点图',
    grid: false,
    data,
    apiAddress: `${SERVER_URL}/api/v0/l7/mock?filename=grade.json`,
  },
}

export default DisturbancePointFigure
