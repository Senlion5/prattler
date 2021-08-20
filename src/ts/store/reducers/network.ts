import { combineReducers } from "redux";
import { NetworkStatusActionTypes } from "../types/network";

const NetworkReducer = () => {
  const { onLine } = navigator;

  const status = (state = onLine, action: NetworkStatusActionTypes) => {
    switch (action.type) {
      case "APP_IS_ONLINE":
      case "APP_IS_OFFLINE":
        return action.networkStatus;
      default: {
        return state;
      }
    }
  };

  return combineReducers({
    status,
  });
};

export default NetworkReducer();
