import authReducer from 'store/auth/reducer'
import postsReducers from 'store/post/reducer'
import { combineReducers } from 'redux'

export const rootState = combineReducers({
  auth: authReducer,
  post: postsReducers,
})
export type RootState = ReturnType<typeof rootState>
