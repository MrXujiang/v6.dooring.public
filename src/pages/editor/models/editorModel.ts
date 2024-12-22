import key from 'keymaster'
import { Reducer, Dispatch, Effect } from 'umi'
import { History } from 'history'

import {
  NumberConfigType,
  TextAreaConfigType,
  BgImgConfigType,
  TextConfigType,
  SelectConfigType,
} from '@/core/FormComponents/types'
import { savetpl, savev6, savepreview, getFreeTpls, gettpl, getv6 } from '@/pages/editor/services/editorModel'
import bg1 from '@/assets/bg1.png'
import bg2 from '@/assets/bg2.jpg'
import bg3 from '@/assets/bg3.jpg'
import bg4 from '@/assets/bg4.jpg'
import bg5 from '@/assets/bg5.jpg'
import { uuid } from '@/utils/tool'

const imgs: string[] = [bg1, bg2, bg3, bg4, bg5]

type CategoryType = 'component' | 'picture' | 'text'
type CateType = 'default'

export interface PointDataItemType {
  type: string
  config: any
  editableEl: any
  category: CategoryType
}

export interface PointDataType {
  id: string
  item: PointDataItemType
  status: string
}

export interface ScreenDataType {
  w: number
  h: number
  title: string
  desc?: string
  cate: CateType
  bg: string
  env?: string
}

export interface EditorModelState {
  isLoading: boolean
  pointData: PointDataType[]
  curPoint: PointDataType | null
  screenConfig: Array<
    NumberConfigType | TextAreaConfigType | BgImgConfigType |
    TextConfigType | SelectConfigType<CateType>
  >
  screenData: ScreenDataType
}

interface KeyEventType {
  dispatch: Dispatch
  history: History
}

interface EditorModelType {
  namespace: 'editorModel'
  state: EditorModelState
  effects: {
    savetpl: Effect
    getv6: Effect
    savev6: Effect
    savepreview: Effect
    getFreeTpls: Effect
    gettpl: Effect
  }
  reducers: {
    startLoading: Reducer,
    closeLoading: Reducer,
    addPointData: Reducer
    modPointData: Reducer
    clearCurPoint: Reducer
    modScreenData: Reducer
    importTplData: Reducer
    copyPointData: Reducer
    delPointData: Reducer
    keyboardCopyPointData: Reducer
    keyboardDelPointData: Reducer
    clearAll: Reducer
  }
  subscriptions: {
    keyEvent: (props: KeyEventType) => void
  }
}

const pointData = localStorage.getItem('userData') || '[]'

function overSave(name: string, data: PointDataType[]) {
  localStorage.setItem(name, JSON.stringify(data))
}

const editorModel: EditorModelType = {
  namespace: 'editorModel',
  state: {
    isLoading: false,
    pointData: JSON.parse(pointData),
    curPoint: null,
    screenConfig: [
      {
        key: 'w',
        name: 'Screen width',
        type: 'Number',
        belong: 'config',
      },
      {
        key: 'h',
        name: 'Screen height',
        type: 'Number',
        belong: 'config',
      },
      {
        key: 'title',
        name: 'Screen name',
        type: 'Text',
        belong: 'config',
      },
      {
        key: 'desc',
        name: 'Screen desc',
        type: 'TextArea',
        belong: 'config',
      },
      {
        key: 'cate',
        name: 'Screen cate',
        type: 'Select',
        range: [
          {
            key: 'default',
            text: 'Default',
          },
        ],
        belong: 'config',
      },
      {
        key: 'bg',
        name: 'Screen bg',
        type: 'BgImg',
        range: imgs,
        belong: 'config',
      },
      {
        key: 'env',
        name: 'Screen env',
        type: 'TextArea',
        belong: 'config',
      },
    ],
    screenData: {
      w: 1440,
      h: 900,
      title: '大屏',
      cate: 'default',
      bg: bg4,
    },
  },
  effects: {
    *savetpl({ payload }, { put, call }) {
      yield put({ type: 'startLoading' })
      const res = yield call(savetpl, payload)
      yield put({ type: 'closeLoading' })
      return res || {}
    },
    *getv6({ payload }, { put, call }) {
      const res = yield call(getv6, payload)
      if (res) {
        yield put({ type: 'importTplData', payload: res })
      }
    },
    *savev6({ payload }, { put, call }) {
      yield put({ type: 'startLoading' })
      const res = yield call(savev6, payload)
      yield put({ type: 'closeLoading' })
      return res || {}
    },
    *savepreview({ payload }, { call, put }) {
      yield put({ type: 'startLoading' })
      yield call(savepreview, payload)
      yield put({ type: 'closeLoading' })
    },
    *getFreeTpls(_, { call }) {
      const res = yield call(getFreeTpls)
      return res || []
    },
    *gettpl({ payload }, { call, put }) {
      const res = yield call(gettpl, payload)
      if (res) {
        yield put({ type: 'importTplData', payload: res })
      }
    },
  },
  reducers: {
    startLoading(state) {
      return { ...state, isLoading: true }
    },
    closeLoading(state) {
      return { ...state, isLoading: false }
    },
    addPointData(state, { payload }) {
      const pointData = [...state.pointData, payload]
      overSave('userData', pointData)
      return {
        ...state,
        pointData,
        curPoint: payload,
      }
    },
    modPointData(state, { payload }) {
      const { id } = payload
      const pointData = state.pointData.map((item: PointDataType) => {
        if (item.id === id) {
          return payload
        }
        return { ...item }
      })
      overSave('userData', pointData)
      return {
        ...state,
        pointData,
        curPoint: payload,
      }
    },
    clearCurPoint(state) {
      return {
        ...state,
        curPoint: null,
      }
    },
    modScreenData(state, { payload }) {
      return {
        ...state,
        screenData: payload,
      }
    },
    importTplData(state, { payload }) {
      overSave('userData', payload)
      return {
        ...state,
        pointData: payload.tpl,
        screenData: payload.pageConfig,
        curPoint: null,
      }
    },
    copyPointData(state, { payload }) {
      const { id } = payload
      const pointData: PointDataType[] = []
      state.pointData.forEach((item: PointDataType) => {
        pointData.push({ ...item })
        if (item.id === id) {
          pointData.push({
            ...item,
            item: {
              ...item.item,
              config: {
                ...item.item.config,
                y: item.item.config.y + 16,
                x: item.item.config.x + 16,
              },
            },
            id: uuid(6, 10),
          })
        }
      })
      overSave('userData', pointData)

      return {
        ...state,
        pointData,
      }
    },
    delPointData(state, { payload }) {
      const { id } = payload
      const pointData = state.pointData.filter((item: PointDataType) => item.id !== id)
      overSave('userData', pointData)
      return {
        ...state,
        pointData,
        curPoint: null,
      }
    },
    keyboardCopyPointData(state) {
      if (state.curPoint) {
        const { id } = state.curPoint
        const pointData: PointDataType[] = []
        state.pointData.forEach((item: PointDataType) => {
          pointData.push({ ...item })
          if (item.id === id) {
            pointData.push({ ...item, id: uuid(6, 10) })
          }
        })
        overSave('userData', pointData)

        return {
          ...state,
          pointData,
        }
      }
      return state
    },
    keyboardDelPointData(state) {
      if (state.curPoint) {
        const { id } = state.curPoint
        const pointData = state.pointData.filter((item: PointDataType) => item.id !== id)
        overSave('userData', pointData)
        return {
          ...state,
          pointData,
          curPoint: null,
        }
      }
      return state
    },
    clearAll(state) {
      overSave('userData', [])
      return {
        ...state,
        pointData: [],
        curPoint: null,
      }
    },
  },
  subscriptions: {
    keyEvent({ dispatch }) {
      // 复制
      key('⌘+c, ctrl+c', () => {
        dispatch({
          type: 'editorModel/keyboardCopyPointData',
        })
      })
      // 删除
      key('delete, backspace', () => {
        dispatch({
          type: 'editorModel/keyboardDelPointData',
        })
      })
    },
  },
}

export default editorModel
