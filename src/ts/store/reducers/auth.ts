import { combineReducers } from "redux";
import { AuthActionTypes, UserState } from "../types/auth";

const AuthReducer = () => {
  const loginReducer = (
    state: { error?: Error } = { error: undefined },
    action: AuthActionTypes
  ) => {
    switch (action.type) {
      case "AUTH_LOGIN_INIT":
        return { error: undefined };
      case "AUTH_LOGIN_FAILURE":
        return { error: action.error };
      default:
        return state;
    }
  };

  const registerReducer = (
    state: { error?: Error } = { error: undefined },
    action: AuthActionTypes
  ) => {
    switch (action.type) {
      case "AUTH_REGISTER_INIT":
        return { error: undefined };
      case "AUTH_REGISTER_FAILURE":
        return { error: action.error };
      default:
        return state;
    }
  };

  const userReducer = (
    state: UserState = { user: undefined },
    action: AuthActionTypes
  ): UserState => {
    switch (action.type) {
      case "AUTH_FAILURE":
      case "AUTH_INIT":
        return { user: undefined };
      case "AUTH_SUCCESS":
        return { user: action.user };
      default:
        return state;
    }
  };

  const isCheckingReducer = (
    state: boolean = false,
    action: AuthActionTypes
  ) => {
    switch (action.type) {
      case "AUTH_INIT":
      case "AUTH_REGISTER_INIT":
      case "AUTH_LOGIN_INIT":
        return true;
      case "AUTH_FAILURE":
      case "AUTH_SUCCESS":
      case "AUTH_LOGIN_FAILURE":
      case "AUTH_REGISTER_FAILURE":
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    user: userReducer,
    isChecking: isCheckingReducer,
    login: loginReducer,
    register: registerReducer,
  });
};

export default AuthReducer();
