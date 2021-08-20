import "react-redux";

import { AuthState } from "./src/ts/store/types/auth";
import { ChatsState } from "./src/ts/store/types/chats";
import { NetworkState } from "./src/ts/store/types/network";
import { SettingsState } from "./src/ts/store/types/settings";

declare module "react-redux" {
  interface DefaultRootState extends ApplicationState {}
}

declare module "electron" {
  interface DefaultRootState extends ApplicationState {}
}

export interface ApplicationState {
  chats: ChatsState;
  auth: AuthState;
  network: NetworkState;
  settings: SettingsState;
}
