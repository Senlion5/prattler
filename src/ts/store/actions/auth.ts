import * as API from "../../api/auth";
import { Dispatch } from "redux";
import firebase from "firebase/app";
import { RegisterReq, LoginReq, UserData } from "../../interfaces/auth";
import { AuthActionTypes } from "../types/auth";

export const registerUser =
  (formData: RegisterReq) =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<null | UserData> => {
    dispatch({ type: "AUTH_REGISTER_INIT" });

    try {
      const user = await API.register(formData);
      dispatch({ type: "AUTH_REGISTER_SUCCESS", user });
      return user;
    } catch (error) {
      dispatch({ type: "AUTH_REGISTER_FAILURE", error });
      return error;
    }
  };

export const loginUser =
  (formData: LoginReq) =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<null | UserData> => {
    dispatch({ type: "AUTH_LOGIN_INIT" });

    try {
      const user = (await API.login(formData)) as UserData;
      dispatch({ type: "AUTH_LOGIN_SUCCESS", user });
      return user as UserData;
    } catch (error) {
      dispatch({ type: "AUTH_LOGIN_FAILURE", error });
      return error;
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
    await API.logout();

    dispatch({ type: "AUTH_LOGOUT_SUCCESS" });
    dispatch({ type: "CHATS_ERASE" });
  };

export const listenToAuthChanges =
  () => (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: "AUTH_INIT" });

    try {
      API.onAuthStateChanges(async (authUser: firebase.User | null) => {
        if (authUser) {
          const userProfile = (await API.getUserProfile(
            authUser.uid
          )) as UserData;
          dispatch({ type: "AUTH_SUCCESS", user: userProfile });
          console.log(`${userProfile.username} is authenticated`);
        } else {
          dispatch({ type: "AUTH_FAILURE" });
          console.log("NO authentication!!!");
        }
      });
    } catch (error) {
      dispatch({ type: "AUTH_LOGIN_FAILURE", error });
      return error;
    }
  };
