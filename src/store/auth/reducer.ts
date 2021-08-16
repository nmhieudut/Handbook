import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS,
  SIGN_OUT,
  SET_CURRENT_USER,
} from './types'
import { AuthActionType } from './types'

export interface LoggedInUser {
  avatar: string | null
  displayName: string | null
}

export interface AuthState {
  isLoading: boolean
  loggedInUser: LoggedInUser | null
  error: string | null
}

const initialState: AuthState = {
  isLoading: false,
  loggedInUser: null,
  error: null,
}

export default function AuthReducer(
  state = initialState,
  action: AuthActionType
): AuthState {
  console.log('action', action)
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      }
    case SIGN_IN:
      return {
        ...state,
        isLoading: true,
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedInUser: action.payload,
      }
    case SIGN_IN_FAILED:
      return {
        isLoading: false,
        loggedInUser: null,
        error: action.message,
      }
    case SIGN_UP:
      return {
        ...state,
        isLoading: true,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedInUser: action.payload,
      }
    case SIGN_UP_FAILED:
      return {
        isLoading: false,
        loggedInUser: null,
        error: action.message,
      }
    case SIGN_OUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
