import * as API from "../../api/connection";
import { Dispatch } from "redux";
import { ConnectionActionTypes } from "../types/connection";

export const checkUserConnection =
  (uid: string) => (dispatch: Dispatch<ConnectionActionTypes>) =>
    API.onConnectionChanged((isConnected: boolean) => {
      API.setUserOnlineStatus(uid, isConnected);
      dispatch({ type: "CONNECTION_USER_STATUS_CHANGED" });
    });
