// import { message } from 'antd'
import undoable, { StateWithHistory } from 'redux-undo'
import { Reducer, AnyAction } from 'redux'

export const dva = {
  config: {
    onError(e: Error) {
      // message.error(e.message, 3)
    },
    onReducer: (reducer: Reducer<any, AnyAction>) => {
      const undoReducer = undoable(reducer)
      return function(state: StateWithHistory<any>, action: AnyAction) {
        const newState = undoReducer(state, action)
        const router = newState.present.router ? newState.present.router : newState.present.routing
        return { ...newState, router }
      }
    },
  },
}
