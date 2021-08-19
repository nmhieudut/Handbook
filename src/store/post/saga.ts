import { deletePost, fetchPosts, updatePost, createPost } from 'services/post'
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
      history.push('/home')
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
    return
  }
}
function* handleCreatePost(action: ActionTypes.CreatePostActionTypes) {
  try {
    const response = yield* call(createPost, action.payload.content)
    console.log(response)

    if (response) {
      return action.cb()
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    return
  }
}
function* handleUpdatePost(action: ActionTypes.UpdatePostActionTypes) {
  try {
    const response: any = yield* call(
      updatePost,
      action.payload.postId,
      action.payload.content
    )
    if (response) {
      return action.cb()
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    return
  }
}
function* handleDeletePost(action: ActionTypes.DeletePostActionTypes) {
  try {
    const response: any = yield* call(deletePost, action.payload.postId)
    if (response.status === 'success') {
      return action.cb()
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    return
  }
}
function* watchedSagas() {
  yield all([
    takeLatest(ActionTypes.FETCH_POSTS, handleFetchPosts),
    takeLatest(ActionTypes.CREATE_POST, handleCreatePost),
    takeLatest(ActionTypes.UPDATE_POST, handleUpdatePost),
    takeLatest(ActionTypes.DELETE_POST, handleDeletePost),
  ])
}

export default watchedSagas
