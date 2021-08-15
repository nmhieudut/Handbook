import { PostActionType, FETCH_POSTS, SET_POSTS } from './types'
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
