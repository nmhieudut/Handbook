import { Post } from './reducer'

export const FETCH_POSTS = 'FETCH_POSTS'
export const SET_POSTS = 'SET_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const LIKE_POST = 'LIKE_POST'
export const COMMENT_POST = 'COMMENT_POST'
export interface FetchPostsActionTypes {
  type: typeof FETCH_POSTS
}

export interface SetPostsActionTypes {
  type: typeof SET_POSTS
  payload: {
    posts: Post[]
    isFetching: boolean
    total: number
  }
}

export interface CreatePostActionTypes {
  type: typeof CREATE_POST
  payload: {
    content: string
  }
  cb: (e?: any) => void
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
  postId: string
  cb: () => void
}

export interface LikePostActionTypes {
  type: typeof LIKE_POST
  postId: string
  cb: () => void
}

export interface CommentPostActionTypes {
  type: typeof COMMENT_POST
  payload: {
    postId: string
    content: string
  }
  cb: () => void
}

export type PostActionType =
  | FetchPostsActionTypes
  | SetPostsActionTypes
  | CreatePostActionTypes
  | UpdatePostActionTypes
  | DeletePostActionTypes
  | LikePostActionTypes
  | CommentPostActionTypes
