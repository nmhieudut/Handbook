import { LSManager } from 'utils/localstoragemanager'
import * as actionTypes from './types'
import { Login, Register } from 'services/auth'
import { all, call, put, takeLatest } from 'typed-redux-saga'
import { history } from 'utils/history'

function* handleLogin(action: actionTypes.SignInActionType) {
  try {
    const res: any = yield* call(
      Login,
      action.payload.username,
      action.payload.password
    )
    if (res.data) {
      yield put({
        type: actionTypes.SIGN_IN_SUCCESS,
        payload: {
          id: res.data.user.id,
          avatar: res.data.user.avatar || null,
          displayName: res.data.user.displayName,
        },
      })
      LSManager.setToken(res.data.token)
      history.push('/')
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    yield put({
      type: actionTypes.SIGN_IN_FAILED,
      message: e.response.data.message,
    })
  }
}
function* handleRegister(action: actionTypes.SignUpActionType) {
  try {
    const res: any = yield* call(
      Register,
      action.payload.displayName,
      action.payload.username,
      action.payload.password
    )
    if (res.data) {
      yield put({
        type: actionTypes.SIGN_UP_SUCCESS,
        payload: {
          id: res.data.user.id,
          avatar: res.data.user.avatar || null,
          displayName: res.data.user.displayName,
        },
      })
      LSManager.setToken(res.data.token)
      history.push('/')
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    yield put({
      type: actionTypes.SIGN_UP_FAILED,
      message: e.response.data.message,
    })
    console.log('Error: ', e)
  }
}
function* watchedSagas() {
  yield all([
    takeLatest(actionTypes.SIGN_IN, handleLogin),
    takeLatest(actionTypes.SIGN_UP, handleRegister),
  ])
}

export default watchedSagas
