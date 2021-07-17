import {
  NumberDefaultType,
  TextDefaultType,
  TableDefaultType,
  ColorDefaultType,
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

export type DashboardEditDataType = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface DashboardConfigType extends BaseDefaultType, BaseDataDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  text: TextDefaultType
  color: ColorDefaultType
  fontSize: NumberDefaultType
  graphicsColor: TextDefaultType
  cylinderWidth: NumberDefaultType
  backgroundColor: TextDefaultType
  data: TableDefaultType
}

export interface DashboardSchema {
  editData: DashboardEditDataType
  config: DashboardConfigType
}

const Dashboard: DashboardSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    {
      key: 'dashboard Set',
      name: 'Dashboard set',
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
          key: 'cylinderWidth',
          name: 'Cylinder width',
          type: 'Number',
          range: [1, Infinity],
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
          key: 'color',
          name: 'Text color',
          type: 'Color',
          belong: 'config',
        },
        {
          key: 'graphicsColor',
          name: 'Graphics color',
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
    ...baseDataDefault,
    width: 250,
    height: 250,
    zIndex: 1,
    layerName: '仪表盘',
    text: '合格率',
    color: 'rgba(255,255,255,1)',
    fontSize: 18,
    graphicsColor: 'rgba(63,149,253,1)',
    cylinderWidth: 10,
    backgroundColor: 'rgba(203,203,203,1)',
    data: [
      {
        name: 'A',
        value: 5.6,
      },
    ],
  },
}

export default Dashboard
