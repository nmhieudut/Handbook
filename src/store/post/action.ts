import {
  PostActionType,
  FETCH_POSTS,
  SET_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from './types'
import { Post } from './reducer'
export function FetchPostsAction(): PostActionType {
  return {
    type: FETCH_POSTS,
  }
}

export function SetPostsAction(
  posts: Post[],
  isFetching: boolean,
  total: number
): PostActionType {
  return {
    type: SET_POSTS,
    posts,
    isFetching,
    total,
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
    payload: {
      postId,
    },
    cb,
  }
}
