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
  id: string
  avatar: string | null
  displayName: string | null
}

export interface AuthState {
  isLoading: boolean
  loggedInUser: LoggedInUser | null
  signInError: string | null
  signUpError: string | null
}

const initialState: AuthState = {
  isLoading: false,
  loggedInUser: null,
  signInError: null,
  signUpError: null,
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
        ...state,
        isLoading: false,
        loggedInUser: null,
        signInError: action.message,
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
        ...state,
        isLoading: false,
        loggedInUser: null,
        signUpError: action.message,
      }
    case SIGN_OUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
