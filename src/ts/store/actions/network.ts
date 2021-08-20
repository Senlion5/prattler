import { Dispatch } from "redux";
import { NetworkStatusActionTypes } from "../types/network";

const onStatusChange = (dispatch: Dispatch<NetworkStatusActionTypes>) => () => {
  const networkStatus = navigator.onLine;
  const action: NetworkStatusActionTypes = networkStatus
    ? { type: "APP_IS_ONLINE", networkStatus }
    : { type: "APP_IS_OFFLINE", networkStatus };

  dispatch(action);
};

export const listenToConnectionChanges =
  () => (dispatch: Dispatch<NetworkStatusActionTypes>) => {
    const connectionHandler = onStatusChange(dispatch);

    window.addEventListener("online", connectionHandler);
    window.addEventListener("offline", connectionHandler);

    return () => {
      window.removeEventListener("online", connectionHandler);
      window.removeEventListener("offline", connectionHandler);
    };
  };
