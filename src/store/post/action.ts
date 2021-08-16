import {
  PostActionType,
  FETCH_POSTS,
  SET_POSTS,
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
export function UpdatePostsAction(content, postId): PostActionType {
  return {
    type: UPDATE_POST,
    payload: {
      content,
      postId,
    },
  }
}
export function DeletePostsAction(postId): PostActionType {
  return {
    type: DELETE_POST,
    payload: {
      postId,
    },
  }
}
