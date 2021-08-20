import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import ChatReducer from "./reducers/chats";
import AuthReducer from "./reducers/auth";
import NetworkReducer from "./reducers/network";
import SettingsReducer from "./reducers/settings";
import AppMiddleware from "./middlewares/app";

import { ApplicationState } from "../../../config";

const configureStore = () => {
  const middlewares = [thunkMiddleware, AppMiddleware];

  const mainReducer = combineReducers({
    chats: ChatReducer,
    auth: AuthReducer,
    network: NetworkReducer,
    settings: SettingsReducer,
  });

  const initialState: ApplicationState = {
    chats: {
      available: [],
      joined: [],
      activeChats: {},
      messages: {},
      messagesSubscriptions: {},
    },
    auth: {
      user: { user: undefined },
      isChecking: false,
      login: {
        error: undefined,
      },
      register: {
        error: undefined,
      },
    },
    network: {
      status: true,
    },
    settings: {
      dict: {
        isDarkTheme: "false",
        showNotifications: "true",
      },
      savable: true,
    },
  };

  const rootReducer = (
    state: ApplicationState = initialState,
    action: any
  ): ApplicationState => {
    if (action.type === "AUTH_LOGOUT_SUCCESS") {
      Object.keys(state).forEach((stateKey) => {
        if (state[stateKey].savable) {
          return;
        }

        state[stateKey] = undefined;
      });
    }

    return mainReducer(state, action);
  };

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  return store;
};

export default configureStore;
