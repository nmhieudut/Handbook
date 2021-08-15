import { put, takeLatest } from 'typed-redux-saga'
import { fetchPosts } from 'services/post'
import * as ActionTypes from './types'

function* handleFetchPosts(action: ActionTypes.FetchPostsActionTypes) {
  try {
    yield put({
      type: ActionTypes.SET_POSTS,
      posts: [],
      isFetching: true,
      total: -1,
    })
    const data = yield fetchPosts()
    if (data.posts.length > 0) {
      yield put({
        type: ActionTypes.SET_POSTS,
        posts: data.posts.map((post) => ({
          id: post._id,
          content: post.content,
          author: {
            id: post.author._id,
            displayName: post.author.displayName,
            avatar: post.author.avatar,
          },
          createdAt: post.createdAt,
        })),
        isFetching: false,
        total: data.total,
      })
    } else {
      yield put({
        type: ActionTypes.SET_POSTS,
        posts: [],
        isFetching: false,
        total: 0,
      })
    }
  } catch (err) {
    console.log('err: ', err)
  }
}

function* watchedSagas() {
  yield takeLatest(ActionTypes.FETCH_POSTS, handleFetchPosts)
}

export default watchedSagas
