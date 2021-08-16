import { Post } from './reducer'

export const FETCH_POSTS = 'FETCH_POSTS'
export const SET_POSTS = 'SET_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export interface FetchPostsActionTypes {
  type: typeof FETCH_POSTS
}

export interface SetPostsActionTypes {
  type: typeof SET_POSTS
  posts: Post[]
  isFetching: boolean
  total: number
}

export interface UpdatePostsActionTypes {
  type: typeof UPDATE_POST
  payload: {
    content: string
    postId: string
  }
}

export interface DeletePostsActionTypes {
  type: typeof DELETE_POST
  payload: {
    postId: string
  }
}

export type PostActionType =
  | FetchPostsActionTypes
  | SetPostsActionTypes
  | UpdatePostsActionTypes
  | DeletePostsActionTypes
