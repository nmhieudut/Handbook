import { Post } from './reducer'

export const FETCH_POSTS = 'FETCH_POSTS'
export const SET_POSTS = 'SET_POSTS'

export interface FetchPostsActionTypes {
  type: typeof FETCH_POSTS
}

export interface SetPostsActionTypes {
  type: typeof SET_POSTS
  posts: Post[]
  isFetching: boolean
  total: number
}

export type PostActionType = FetchPostsActionTypes | SetPostsActionTypes
