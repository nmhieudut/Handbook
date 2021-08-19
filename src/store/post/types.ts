import { Post } from './reducer'

export const FETCH_POSTS = 'FETCH_POSTS'
export const SET_POSTS = 'SET_POSTS'
export const CREATE_POST = 'CREATE_POST'
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

export interface CreatePostActionTypes {
  type: typeof CREATE_POST
  payload: {
    content: string
  }
  cb: () => void
}
export interface UpdatePostActionTypes {
  type: typeof UPDATE_POST
  payload: {
    content: string
    postId: string
  }
  cb: () => void
}

export interface DeletePostActionTypes {
  type: typeof DELETE_POST
  payload: {
    postId: string
  }
  cb: () => void
}

export type PostActionType =
  | FetchPostsActionTypes
  | SetPostsActionTypes
  | CreatePostActionTypes
  | UpdatePostActionTypes
  | DeletePostActionTypes
