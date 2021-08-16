import { LoggedInUser } from './reducer'
import {
  SignInUserPayload,
  AuthActionType,
  SIGN_IN,
  SignUpUserPayload,
  SIGN_UP,
  SIGN_OUT,
  SET_CURRENT_USER,
} from './types'

export function SignInAction(payload: SignInUserPayload): AuthActionType {
  return {
    type: SIGN_IN,
    payload,
  }
}
export function SignUpAction(payload: SignUpUserPayload): AuthActionType {
  return {
    type: SIGN_UP,
    payload,
  }
}

export function SignOutAction(): AuthActionType {
  return { type: SIGN_OUT }
}
export function SetCurrentUserAction(payload: LoggedInUser): AuthActionType {
  return {
    type: SET_CURRENT_USER,
    payload,
  }
}
