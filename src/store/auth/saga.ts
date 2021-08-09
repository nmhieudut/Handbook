import { LSManager } from 'utils/localstoragemanager'
import * as actionTypes from './types'
import { Login } from 'services/auth'
import { call } from 'typed-redux-saga'
import { put, takeLatest } from 'redux-saga/effects'

function* login(action: actionTypes.SignInActionType) {
  try {
    const res: any = yield* call(
      Login,
      action.payload.username,
      action.payload.password
    )
    console.log('--=====-', res.data)
    if (res.data) {
      yield put({
        type: actionTypes.SIGN_IN_SUCCESS,
        payload: {
          avatar: res.data.photo || null,
          displayName: res.data.userName,
        },
      })
      LSManager.setToken(res.data.token)
    }
  } catch (e: any) {
    console.log('-ewqdsa', e.response.data.message)
    yield put({
      type: actionTypes.SIGN_IN_FAILED,
      message: e.response.data.message,
    })
    console.log('Error: ', e)
  }
}

function* watchedSagas() {
  yield takeLatest(actionTypes.SIGN_IN, login)
}
export default watchedSagas
