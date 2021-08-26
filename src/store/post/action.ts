import {
  PostActionType,
  FETCH_POSTS,
  SET_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE_POST,
  COMMENT_POST,
  SEARCH_POSTS,
} from './types'
import { Post } from './reducer'
export function FetchPostsAction(): PostActionType {
  return {
    type: FETCH_POSTS,
  }
}

export function SetPostsAction(payload: {
  posts: Post[]
  isFetching: boolean
  total: number
}): PostActionType {
  return {
    type: SET_POSTS,
    payload,
  }
}
export function CreatePostAction(content, cb): PostActionType {
  return {
    type: CREATE_POST,
    payload: {
      content,
    },
    cb,
  }
}
export function UpdatePostAction(content, postId, cb): PostActionType {
  return {
    type: UPDATE_POST,
    payload: {
      content,
      postId,
    },
    cb,
  }
}
export function DeletePostAction(postId, cb): PostActionType {
  return {
    type: DELETE_POST,
    postId,
    cb,
  }
}

export function LikePostAction(postId, cb): PostActionType {
  return {
    type: LIKE_POST,
    postId,
    cb,
  }
}
export function CommentPostAction(postId, content, cb): PostActionType {
  return {
    type: COMMENT_POST,
    payload: {
      postId,
      content,
    },
    cb,
  }
}
export function SearchPostsAction(query, cb): PostActionType {
  return {
    type: SEARCH_POSTS,
    payload: {
      query,
    },
    cb,
  }
}
