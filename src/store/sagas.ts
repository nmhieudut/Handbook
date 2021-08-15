import { all, fork } from 'redux-saga/effects'
import authSaga from 'store/auth/saga'
import postSaga from 'store/post/saga'

export default function* rootSagas() {
  yield all([fork(authSaga)])
  yield all([fork(postSaga)])
}
