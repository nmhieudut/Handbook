import { PostActionType, SET_POSTS } from './types'

export interface Author {
  id: string
  displayName: string
  avatar: string
}

export interface Post {
  id: string
  content: string
  author: Author
  createdAt: Date
}

export interface PostState {
  isFetching: boolean
  // hasSearched: boolean
  posts: Post[]
  total: number
}

const initialState: PostState = {
  isFetching: false,
  // hasSearched: false,
  posts: [],
  total: -1,
}

export default function postsReducers(
  state = initialState,
  action: PostActionType
): PostState {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
        isFetching: action.isFetching,
        total: action.total,
        // hasSearched: action.hasSearched,
      }
    default:
      return state
  }
}
