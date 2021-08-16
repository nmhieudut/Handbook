import { deletePost, fetchPosts, updatePost } from 'services/post'
import { all, call, put, takeLatest } from 'typed-redux-saga'
import { history } from 'utils/history'
import * as ActionTypes from './types'
function* handleFetchPosts() {
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
function* handleUpdatePost(action: ActionTypes.UpdatePostsActionTypes) {
  try {
    const res: any = yield* call(
      updatePost,
      action.payload.postId,
      action.payload.content
    )
    if (res) {
      yield put({
        type: ActionTypes.FETCH_POSTS,
      })
      history.push('/home')
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
  }
}
function* handleDeletePost(action: ActionTypes.UpdatePostsActionTypes) {
  try {
    const res: any = yield* call(deletePost, action.payload.postId)
    if (res.status === 'success') {
      console.log('ressss', res)
      yield put({
        type: ActionTypes.FETCH_POSTS,
      })
      history.push('/home')
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
  }
}
function* watchedSagas() {
  yield all([
    takeLatest(ActionTypes.FETCH_POSTS, handleFetchPosts),
    takeLatest(ActionTypes.UPDATE_POST, handleUpdatePost),
    takeLatest(ActionTypes.DELETE_POST, handleDeletePost),
  ])
}

export default watchedSagas
