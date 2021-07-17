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
} from '@/components/BasicShop/common'

type tableSizeType = 'small' | 'middle' | 'large' | undefined

export type ListEditData = Array<
  BaseConfigType | BaseDataConfigType | CollapseConfigType
>

export interface ListConfig extends BaseDefaultType, BaseDataDefaultType {
  layerName: TextDefaultType
  width: NumberDefaultType
  height: NumberDefaultType
  zIndex: NumberDefaultType
  bordered: SwitchDefaultType
  size: tableSizeType
  toggle: SwitchDefaultType
  pageSize: TextDefaultType
}

export interface ListSchema {
  editData: ListEditData
  config: ListConfig
}
const List: ListSchema = {
  editData: [
    ...baseConfig,
    ...getBaseDataConfig(),
    {
      key: 'listSet',
      name: 'List set',
      type: 'Collapse',
      range: [
        {
          key: 'bordered',
          name: 'Bordered',
          type: 'Switch',
          belong: 'config',
        },
        {
          key: 'toggle',
          name: 'Pagination',
          type: 'Switch',
          belong: 'config',
        },
        {
          key: 'pageSize',
          name: 'Page size',
          type: 'Select',
          range: [
            {
              key: '10',
              text: '10',
            },
            {
              key: '20',
              text: '20',
            },
            {
              key: '50',
              text: '50',
            },
            {
              key: '100',
              text: '100',
            },
          ],
          belong: 'config',
          toggle: true,
        },
        {
          key: 'size',
          name: 'Size',
          type: 'Select',
          range: [
            {
              key: 'large',
              text: 'Default',
            },
            {
              key: 'large',
              text: 'Large',
            },
            {
              key: 'middle',
              text: 'Middle',
            },
            {
              key: 'small',
              text: 'Small',
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
    layerName: '列表',
    width: 500,
    height: 160,
    zIndex: 1,
    bordered: true,
    size: 'small',
    data: [
      {
        name: '小明',
        value: 32,
      },
      {
        name: '小刚',
        value: 42,
      },
    ],
    toggle: true,
    pageSize: '10',
  },
}
export default List
