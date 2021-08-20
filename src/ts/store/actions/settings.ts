export const updateSettings = (setting: string, value: boolean) => {
  return {
    type: "SETTINGS_UPDATE",
    setting,
    value,
  };
};

export const loadInitialSettings = () => ({
  type: "SETTINGS_INITIAL_LOAD",
});
