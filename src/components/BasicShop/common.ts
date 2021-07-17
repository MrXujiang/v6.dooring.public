import {
  NumberConfigType,
  NumberDefaultType,
  TextConfigType,
  TextDefaultType,
  DataConfigType,
  RadioConfigType,
  DataType,
  ApiMethod,
  TableConfigType,
  TextAreaConfigType,
  CollapseConfigType,
  ToggleType,
  LegendPosition,
  LegendLayout,
  LegendShape,
} from '@/core/FormComponents/types'

// 提取所有公用设置，传来时加到这里，约定公用类型
// 公用配置需满足条件，所有组件初始值统一，否则不放公用设置

export const colors = ['rgba(255,0,0,1)', 'rgba(255,165,0,1)', 'rgba(255,255,0,1)', 'rgba(0,128,0,1)', 'rgba(0,255,255,1)', 'rgba(0,0,255,1)', 'rgba(128,0,128,1)']

export interface TemplateType {
  type: TextDefaultType
  cols?: TextDefaultType
  displayName?: TextDefaultType
}

export type BaseConfigType = NumberConfigType | TextConfigType

export const baseConfig: Array<BaseConfigType> = [
  {
    key: 'layerName',
    name: 'Layer name',
    type: 'Text',
    belong: 'config',
  },
  {
    key: 'y',
    name: 'Vertical display',
    type: 'Number',
    belong: 'config',
  },
  {
    key: 'x',
    name: 'Horizontal display',
    type: 'Number',
    belong: 'config',
  },
  {
    key: 'width',
    name: 'Component width',
    type: 'Number',
    belong: 'config',
  },
  {
    key: 'height',
    name: 'Component height',
    type: 'Number',
    belong: 'config',
  },
  {
    key: 'zIndex',
    name: 'Component zIndex',
    type: 'Number',
    belong: 'config',
  },
]

export interface BaseDefaultType {
  y: NumberDefaultType
  x: NumberDefaultType
  isTpl?: boolean
}

export const baseDefault: BaseDefaultType = {
  y: 0,
  x: 0,
}

export type BaseDataConfigType = DataConfigType | RadioConfigType<DataType | ApiMethod> | TextAreaConfigType | NumberConfigType | TableConfigType

export const getBaseDataConfig: (type?: string) => Array<BaseDataConfigType> = (type) => [
  {
    key: 'tipEvent',
    name: 'Tip event',
    type: 'Data',
    belong: 'event',
  },
  {
    key: 'titleEvent',
    name: 'Title event',
    type: 'Data',
    belong: 'event',
  },
  {
    key: 'dataType',
    name: 'Data type',
    type: 'Radio',
    range: [
      {
        key: 'static',
        text: 'Static data',
      },
      {
        key: 'dynamic',
        text: 'Dynamic data',
      },
    ],
    belong: 'data',
  },
  type === 'Data'
    ? {
      key: 'data',
      name: 'Data source',
      type: 'Data',
      belong: 'data',
      dataType: 'static',
    }
    : {
      key: 'data',
      name: 'Data source',
      type: 'Table',
      belong: 'data',
      dataType: 'static',
    },
  {
    key: 'apiAddress',
    name: 'Api address',
    type: 'TextArea',
    belong: 'data',
    dataType: 'dynamic',
  },
  {
    key: 'apiMethod',
    name: 'Api method',
    type: 'Radio',
    range: [
      {
        key: 'get',
        text: 'GET',
      },
      {
        key: 'post',
        text: 'POST',
      },
    ],
    belong: 'data',
    dataType: 'dynamic',
  },
  {
    key: 'apiData',
    name: 'Api data',
    type: 'Data',
    belong: 'data',
    dataType: 'dynamic',
  },
  {
    key: 'refreshTime',
    name: 'Refresh Time',
    type: 'Number',
    belong: 'data',
    dataType: 'dynamic',
  },
]

export interface BaseDataDefaultType {
  tipEvent: TextDefaultType
  titleEvent: TextDefaultType
  dataType: ToggleType
  apiAddress: TextDefaultType
  apiMethod: TextDefaultType
  apiData: TextDefaultType
  refreshTime: NumberDefaultType
  data?: any
}

export const baseDataDefault: BaseDataDefaultType = {
  tipEvent: '',
  titleEvent: '',
  dataType: 'static',
  apiAddress: '',
  apiMethod: 'get',
  apiData: '',
  refreshTime: -1,
}

export const legendConfig: Array<CollapseConfigType> = [
  {
    key: 'legendOperation',
    name: 'Legend operation',
    type: 'Collapse',
    range: [
      {
        key: 'toggle',
        name: 'Legend',
        type: 'Switch',
        belong: 'config',
      },
      {
        key: 'legendPosition',
        name: 'Legend position',
        type: 'Select',
        range: [
          {
            key: 'top',
            text: 'top',
          },
          {
            key: 'top-left',
            text: 'top-left',
          },
          {
            key: 'top-right',
            text: 'top-right',
          },
          {
            key: 'right',
            text: 'right',
          },
          {
            key: 'right-top',
            text: 'right-top',
          },
          {
            key: 'right-bottom',
            text: 'right-bottom',
          },
          {
            key: 'left',
            text: 'left',
          },
          {
            key: 'left-top',
            text: 'left-top',
          },
          {
            key: 'left-bottom',
            text: 'left-bottom',
          },
          {
            key: 'bottom',
            text: 'bottom',
          },
          {
            key: 'bottom-left',
            text: 'bottom-left',
          },
          {
            key: 'bottom-right',
            text: 'bottom-right',
          },
        ],
        belong: 'config',
        toggle: true,
      },
      {
        key: 'legendLayout',
        name: 'Legend layout',
        type: 'Select',
        range: [
          {
            key: 'horizontal',
            text: 'Horizontal',
          },
          {
            key: 'vertical',
            text: 'Vertical',
          },
        ],
        belong: 'config',
        toggle: true,
      },
      {
        key: 'legendShape',
        name: 'Legend shape',
        type: 'Select',
        range: [
          {
            key: 'circle',
            text: 'Circle',
          },
          {
            key: 'square',
            text: 'Square',
          },
          {
            key: 'line',
            text: 'Vertical line',
          },
          {
            key: 'diamond',
            text: 'Diamond',
          },
          {
            key: 'triangle',
            text: 'Triangle',
          },
          {
            key: 'triangle-down',
            text: 'TriangleDown',
          },
          {
            key: 'hexagon',
            text: 'Hexagon',
          },
          {
            key: 'bowtie',
            text: 'Bowtie',
          },
          {
            key: 'cross',
            text: 'Cross',
          },
          {
            key: 'plus',
            text: 'Plus',
          },
          {
            key: 'hyphen',
            text: 'Hyphen',
          },
        ],
        belong: 'config',
        toggle: true,
      },
    ],
    belong: 'config',
  },
]

export interface LegendDefaultType {
  toggle: ToggleType
  legendPosition: LegendPosition
  legendLayout: LegendLayout
  legendShape: LegendShape
}

export const legendDefault: LegendDefaultType = {
  toggle: true,
  legendPosition: 'bottom',
  legendLayout: 'horizontal',
  legendShape: 'circle',
}
