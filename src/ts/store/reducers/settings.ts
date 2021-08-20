import { SettingsActionTypes, SettingsState } from "../types/settings";

const INITIAL_STATE: SettingsState = {
  dict: {
    isDarkTheme: "false",
    showNotifications: "true",
  },
  savable: true,
};

export default function SettingsReducer(
  state: SettingsState = INITIAL_STATE,
  action: SettingsActionTypes
): SettingsState {
  switch (action.type) {
    case "SETTINGS_UPDATE":
      const newState = {
        ...state,
        dict: { ...state.dict, [action.setting]: String(action.value) },
      };
      return newState;
    case "SETTINGS_INITIAL_LOAD":
      const storedSettings = localStorage.getItem("app-settings");
      if (!storedSettings) {
        const stringifiedState = JSON.stringify(state);
        localStorage.setItem("app-settings", stringifiedState);
      } else {
        const settings = storedSettings ? JSON.parse(storedSettings) : {};
        return { ...state, ...settings };
      }
    default:
      return state;
  }
}
