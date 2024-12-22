export type DataType = 'static' | 'dynamic'
export type ApiMethod = 'get' | 'post'
export type TextAlignType = 'left' | 'right' | 'center'
export type FontBoldType = 'lighter' | 'normal' | 'bold' | 'bolder'
export type LegendPosition = 'top' | 'top-left' | 'top-right' | 'right' | 'right-top' | 'right-bottom' | 'left' | 'left-top' | 'left-bottom' | 'bottom' | 'bottom-left' | 'bottom-right'
export type LegendLayout = 'horizontal' | 'vertical'
export type LegendShape = 'circle' | 'square' | 'line' | 'diamond' | 'triangle' | 'triangle-down' | 'hexagon' | 'bowtie' | 'cross' | 'plus' | 'hyphen'

export type ToggleType = string | boolean

export interface UploadConfigType {
  key: string
  name: string
  type: 'Upload'
  isCrop?: boolean
  cropRate?: number
}

export type UploadDefaultType = Array<{
  uid: string
  name: string
  status: string
  url: string
}>

export interface TextConfigType {
  key: string
  name: string
  type: 'Text'
  belong: string
  dataType?: ToggleType
  toggle?: ToggleType
}
export type TextDefaultType = string

export interface DataConfigType {
  key: string
  name: string
  type: 'Data'
  belong: string
  toggle?: ToggleType,
  dataType?: ToggleType
}

export interface TextAreaConfigType {
  key: string
  name: string
  type: 'TextArea'
  belong: string
  toggle?: ToggleType,
  dataType?: ToggleType
}
export type TextAreaDefaultType = string

export interface NumberConfigType {
  key: string
  name: string
  type: 'Number'
  range?: [number, number]
  step?: number
  belong: string
  toggle?: ToggleType,
  dataType?: ToggleType
}
export type NumberDefaultType = number

export interface BgImgConfigType {
  key: string
  name: string
  type: 'BgImg'
  range: string[]
  belong: string
  dataType?: string
}

export interface IDataListConfigType {
  key: string
  name: string
  type: 'DataList'
  cropRate: number
}

export type TDataListDefaultTypeItem = {
  id: string
  title: string
  desc: string
  link: string
  type?: number
  imgUrl: UploadDefaultType
}
export type TDataListDefaultType = Array<TDataListDefaultTypeItem>

export interface ColorConfigType {
  key: string
  name: string
  type: 'Color'
  belong: string
}
export type ColorDefaultType = string

export interface MultiColorConfigType {
  key: string
  name: string
  type: 'MultiColor'
  belong: string
}

export interface IRichTextConfigType {
  key: string
  name: string
  type: 'RichText'
}
export type TRichTextDefaultType = string

export interface MutiTextConfigType {
  key: string
  name: string
  type: 'MutiText'
}
export type MutiTextDefaultType = Array<string>

export interface SelectConfigType<KeyType> {
  key: string
  name: string
  type: 'Select'
  range: Array<{
    key: KeyType
    text: string
  }>
  belong: string
  toggle?: ToggleType
  dataType?: ToggleType
}
export type SelectRangType<KeyType> = KeyType

export interface RadioConfigType<KeyType> {
  key: string
  name: string
  type: 'Radio'
  range: Array<{
    key: KeyType
    text: string
  }>
  belong: string
  toggle?: ToggleType,
  dataType?: ToggleType
}
export type RadioDefaultType<KeyType> = KeyType

export interface SwitchConfigType {
  key: string
  name: string
  type: 'Switch'
  belong: string
}
export type SwitchDefaultType = boolean

export interface ICardPickerConfigType<T> {
  key: string
  name: string
  type: 'CardPicker'
  icons: Array<T>
}
export type TCardPickerDefaultType<T> = T

export interface TableConfigType {
  key: string
  name: string
  type: 'Table'
  belong: string
  toggle?: ToggleType,
  dataType?: ToggleType
}
export type TableDefaultType = Array<{
  name: string
  value: number
}>

// position input control
export interface IPosConfigType {
  key: string
  name: string
  type: 'Pos'
  placeObj: {
    text: string
    link: string
  }
}

export type TPosItem = number | undefined

export type TPosDefaultType = [TPosItem, TPosItem]

export interface IFormItemsConfigType {
  key: string
  name: string
  type: 'FormItems'
}

export type CollapseRangType = Array<
  SelectConfigType<any> | UploadConfigType | TextConfigType | DataConfigType | TextAreaConfigType |
  NumberConfigType | BgImgConfigType | ColorConfigType | MutiTextConfigType | RadioConfigType<any> |
  SwitchConfigType | TableConfigType | MultiColorConfigType
>
export interface CollapseConfigType {
  key: string
  name: string
  type: 'Collapse'
  range: CollapseRangType
  belong: string
}

// 0---------baseform
export type baseFormOptionsType = {
  label: string
  value: string
}

export type baseFormTextTpl = {
  id: string
  type: 'Text'
  label: string
  placeholder: string
}

export type baseFormTextTipTpl = {
  id: string
  type: 'MyTextTip'
  label: string
  color: string
  fontSize: number
}

export type baseFormNumberTpl = {
  id: string
  type: 'Number'
  label: string
  placeholder: string
}

export type baseFormTextAreaTpl = {
  id: string
  type: 'Textarea'
  label: string
  placeholder: string
}

export type baseFormMyRadioTpl = {
  id: string
  type: 'MyRadio'
  label: string
  options: baseFormOptionsType[]
}

export type baseFormMyCheckboxTpl = {
  id: string
  type: 'MyCheckbox'
  label: string
  options: baseFormOptionsType[]
}

export type baseFormMySelectTpl = {
  id: string
  type: 'MySelect'
  label: string
  options: baseFormOptionsType[]
}

export type baseFormDateTpl = {
  id: string
  type: 'Date'
  label: string
  placeholder: string
}

export type baseFormUnion =
  | baseFormTextTpl
  | baseFormTextTipTpl
  | baseFormNumberTpl
  | baseFormTextAreaTpl
  | baseFormMyRadioTpl
  | baseFormMyCheckboxTpl
  | baseFormMySelectTpl
  | baseFormDateTpl
export type baseFormUnionType =
  | baseFormTextTpl['type']
  | baseFormTextTipTpl['type']
  | baseFormNumberTpl['type']
  | baseFormTextAreaTpl['type']
  | baseFormMyRadioTpl['type']
  | baseFormMyCheckboxTpl['type']
  | baseFormMySelectTpl['type']
  | baseFormDateTpl['type']

export type TFormItemsDefaultType = Array<baseFormUnion>
