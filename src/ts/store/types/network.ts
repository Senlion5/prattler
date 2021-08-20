export interface NetworkOnlineStatusAction {
  type: "APP_IS_ONLINE";
  networkStatus: boolean;
}

export interface NetworkOfflineStatusAction {
  type: "APP_IS_OFFLINE";
  networkStatus: boolean;
}

export type NetworkStatusActionTypes =
  | NetworkOnlineStatusAction
  | NetworkOfflineStatusAction;

export interface NetworkState {
  status: boolean;
}
