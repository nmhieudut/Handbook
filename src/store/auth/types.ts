import { LoggedInUser } from './reducer'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED'

export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED'

export const SIGN_OUT = 'SIGN_OUT'

export interface SignInUserPayload {
  username: string
  password: string
}

export interface SignInActionType {
  type: typeof SIGN_IN
  payload: SignInUserPayload
}

export interface SignInSucessActionType {
  type: typeof SIGN_IN_SUCCESS
  payload: LoggedInUser
}

export interface SignInFailedActionType {
  type: typeof SIGN_IN_FAILED
  message: string
}

export interface SignUpUserPayload {
  displayName: string
  username: string
  password: string
}
export interface SignUpActionType {
  type: typeof SIGN_UP
  payload: SignUpUserPayload
}
export interface SignUpSucessActionType {
  type: typeof SIGN_UP_SUCCESS
  payload: LoggedInUser
}

export interface SignUpFailedActionType {
  type: typeof SIGN_UP_FAILED
  message: string
}

export interface SignOutActionType {
  type: typeof SIGN_OUT
}

export type AuthActionType =
  | SignInActionType
  | SignInSucessActionType
  | SignInFailedActionType
  | SignUpActionType
  | SignUpSucessActionType
  | SignUpFailedActionType
  | SignOutActionType
