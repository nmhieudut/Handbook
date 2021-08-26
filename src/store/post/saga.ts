import {
  deletePost,
  fetchPosts,
  updatePost,
  createPost,
  likePost,
  commentPost,
  searchPosts,
} from 'services/post'
import { all, call, put, select, takeLatest } from 'typed-redux-saga'
import { history } from 'utils/history'
import * as ActionTypes from './types'
function* handleFetchPosts() {
  try {
    yield put({
      type: ActionTypes.SET_POSTS,
      payload: {
        posts: [],
        isFetching: true,
        total: -1,
      },
    })
    const data = yield fetchPosts()
    if (data.posts.length > 0) {
      yield put({
        type: ActionTypes.SET_POSTS,
        payload: {
          posts: data.posts.map((post) => ({
            id: post._id,
            content: post.content,
            author: {
              id: post.author._id,
              displayName: post.author.displayName,
              avatar: post.author.avatar,
            },
            createdAt: post.createdAt,
            likes: post.likes,
            comments: post.comments,
          })),
          isFetching: false,
          total: data.posts.length,
        },
      })
      history.push('/')
    } else {
      yield put({
        type: ActionTypes.SET_POSTS,
        payload: {
          posts: [],
          isFetching: false,
          total: 0,
        },
      })
    }
  } catch (err) {
    console.log('err: ', err)
    return
  }
}
function* handleCreatePost(action: ActionTypes.CreatePostActionTypes) {
  try {
    const posts = yield* select((state) => state.post.posts)
    const data = yield* call(createPost, action.payload.content)
    data.post.id = data.post._id
    data.post.author.id = data.post.author._id
    delete data.post._id
    delete data.post.author._id
    if (data) {
      yield put({
        type: ActionTypes.SET_POSTS,
        payload: {
          posts: [data.post, ...posts],
        },
      })
    }
    return action.cb()
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    return action.cb(e)
  }
}
function* handleUpdatePost(action: ActionTypes.UpdatePostActionTypes) {
  try {
    const posts = yield* select((state) => state.post.posts)
    const data: any = yield* call(
      updatePost,
      action.payload.postId,
      action.payload.content
    )
    if (data) {
      yield put({
        type: ActionTypes.SET_POSTS,
        payload: {
          posts: posts.map((post) =>
            post.id === data.post._id
              ? { ...post, content: data.post.content }
              : post
          ),
        },
      })
      return action.cb()
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    return
  }
}
function* handleDeletePost(action: ActionTypes.DeletePostActionTypes) {
  try {
    const posts = yield* select((state) => state.post.posts)
    const response: any = yield* call(deletePost, action.postId)
    if (response.status === 'success') {
      yield put({
        type: ActionTypes.SET_POSTS,
        payload: {
          posts: [...posts].filter((p) => p.id !== action.postId),
        },
      })
      return action.cb()
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    return
  }
}

function* handleLikePost(action: ActionTypes.LikePostActionTypes) {
  try {
    const posts = yield* select((state) => state.post.posts)
    const data: any = yield* call(likePost, action.postId)
    if (data) {
      yield put({
        type: ActionTypes.SET_POSTS,
        payload: {
          posts: posts.map((post) =>
            post.id === data.post._id
              ? { ...post, likes: [...data.post.likes] }
              : post
          ),
        },
      })
      return action.cb()
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    return
  }
}
function* handleCommentPost(action: ActionTypes.CommentPostActionTypes) {
  try {
    const posts = yield* select((state) => state.post.posts)
    const data: any = yield* call(
      commentPost,
      action.payload.postId,
      action.payload.content
    )
    if (data.post) {
      yield put({
        type: ActionTypes.SET_POSTS,
        payload: {
          posts: posts.map((post) =>
            post.id === data.post._id
              ? { ...post, comments: [...data.post.comments] }
              : post
          ),
        },
      })
      return action.cb()
    }
  } catch (e: any) {
    console.log('Error: ', e.response.data.message)
    return
  }
}
function* handleSearchPosts(action: ActionTypes.SearchPostsActionTypes) {
  try {
    yield put({
      type: ActionTypes.SET_POSTS,
      payload: {
        posts: [],
        isFetching: true,
        total: -1,
      },
    })
    const posts: any = yield call(searchPosts, action.payload.query)
    if (posts) {
      yield put({
        type: ActionTypes.SET_POSTS,
        payload: {
          posts: posts.map((post) => ({
            id: post._id,
            content: post.content,
            author: {
              id: post.author._id,
              displayName: post.author.displayName,
              avatar: post.author.avatar,
            },
            createdAt: post.createdAt,
            likes: post.likes,
            comments: post.comments,
          })),
          isFetching: false,
          total: posts.length,
        },
      })
      return yield action.cb()
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
    takeLatest(ActionTypes.LIKE_POST, handleLikePost),
    takeLatest(ActionTypes.COMMENT_POST, handleCommentPost),
    takeLatest(ActionTypes.SEARCH_POSTS, handleSearchPosts),
  ])
}

export default watchedSagas
