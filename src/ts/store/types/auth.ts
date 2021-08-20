import { UserData } from "../../interfaces/auth";

export interface RegisterInitAction {
  type: "AUTH_REGISTER_INIT";
}

export interface RegisterSuccessAction {
  type: "AUTH_REGISTER_SUCCESS";
  user: UserData;
}

export interface RegisterFailureAction {
  type: "AUTH_REGISTER_FAILURE";
  error: Error;
}

export interface LoginInitAction {
  type: "AUTH_LOGIN_INIT";
}

export interface LoginSuccessAction {
  type: "AUTH_LOGIN_SUCCESS";
  user: UserData;
}

export interface LoginFailureAction {
  type: "AUTH_LOGIN_FAILURE";
  error: Error;
}

export interface LogoutAction {
  type: "AUTH_LOGOUT_SUCCESS";
}

export interface ChatsEraseAction {
  type: "CHATS_ERASE";
}

export interface AuthInitAction {
  type: "AUTH_INIT";
}

export interface AuthSuccessAction {
  type: "AUTH_SUCCESS";
  user: UserData;
}

export interface AuthFailureAction {
  type: "AUTH_FAILURE";
}

export type AuthActionTypes =
  | RegisterInitAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginInitAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | ChatsEraseAction
  | AuthInitAction
  | AuthSuccessAction
  | AuthFailureAction;

export interface UserState {
  user?: UserData;
}

export interface AuthState {
  user: UserState;
  isChecking: boolean;
  login: {
    error?: Error;
  };
  register: {
    error?: Error;
  };
}
