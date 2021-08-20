export interface UpdateSettingAction {
  type: "SETTINGS_UPDATE";
  setting: string;
  value: boolean;
}

export interface LoadInitialSettingsAction {
  type: "SETTINGS_INITIAL_LOAD";
}

export type SettingsActionTypes =
  | UpdateSettingAction
  | LoadInitialSettingsAction;

export interface SettingsState {
  dict: { [name: string]: string };
  savable: boolean;
}
