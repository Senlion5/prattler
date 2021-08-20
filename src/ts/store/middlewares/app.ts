import { ApplicationState } from "config";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import Notification from "../../utils/notifications";

const AppMiddleware: Middleware =
  (store: MiddlewareAPI<Dispatch, ApplicationState>) => (next) => (action) => {
    switch (action.type) {
      //network
      case "APP_IS_ONLINE":
      case "APP_IS_OFFLINE": {
        const currentSettings = store.getState().settings.dict;

        const showNotifications =
          currentSettings["showNotifications"] === "true";

        if (showNotifications) {
          Notification.show({
            title: "Prattler Network Status",
            body: action.networkStatus ? "Online" : "Offline",
          });
        }
      }
      //settings
      case "SETTINGS_UPDATE": {
        const currentSettings = localStorage.getItem("app-settings");
        const parsedCurrentSettings = currentSettings
          ? JSON.parse(currentSettings)
          : {};

        for (let [key] of Object.entries(parsedCurrentSettings.dict)) {
          if (key === action.setting) {
            parsedCurrentSettings.dict = {
              ...parsedCurrentSettings.dict,
              [action.setting]: String(action.value),
            };
          }
        }

        const settings = { ...parsedCurrentSettings };
        const stringifiedSettings = JSON.stringify(settings);
        localStorage.setItem("app-settings", stringifiedSettings);
      }
      //unsubscribe from messages on logout
      case "AUTH_LOGOUT_SUCCESS": {
        const { messagesSubscriptions } = store.getState().chats;
        if (messagesSubscriptions) {
          Object.keys(messagesSubscriptions).forEach((messageSubscription) => {
            messagesSubscriptions[messageSubscription]();
          });
        }
      }
    }

    return next(action);
  };

export default AppMiddleware;
