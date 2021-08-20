import React, { FC } from "react";
import FlatList from "flatlist-react";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../store/actions/settings";
import withNavWrapper from "../../wrappers/withNavWrapper";
import {
  SettingsHeaderText,
  QuitButton,
  StyledFormControlLabel,
  StyledCheckbox,
} from "./SettingsStyles";
import { cn } from "@bem-react/classname";
import "./SettingsScreen.scss";
import electron from "../../electron";

interface Setting {
  title: string;
  name: string;
}

const b = cn("SettingsBackground");

const settingsList: Setting[] = [
  {
    title: "Dark Theme",
    name: "isDarkTheme",
  },
  {
    title: "Enable Connection Notifications",
    name: "showNotifications",
  },
];

const Settings: FC = () => {
  const dispatch = useDispatch();

  const settingsDict = useSelector(({ settings }) => settings.dict);

  const handleChange = ({ target: { name, checked } }) => {
    dispatch(updateSettings(name, checked));
  };

  const renderSettingItem = (setting: Setting) => {
    return (
      <StyledFormControlLabel
        control={
          <StyledCheckbox
            onChange={handleChange}
            checked={settingsDict[setting.name] === "true"}
          />
        }
        name={setting.name}
        label={
          <div className={b("SettingsFrame_SettingLabel")}>
            <div>{setting.title}</div>
          </div>
        }
      />
    );
  };

  return (
    <div className={b("")}>
      <div className={b("SettingsFrame")}>
        <div className={b("SettingsFrame_Settings")}>
          <div className={b("SettingsFrame_HeaderFrame")}>
            <div className={b("SettingsFrame_HeaderFrame_Logo")}>
              <img
                src="assets/images/pr.svg"
                alt="SVG"
                height="42px"
                width="42px"
              />
            </div>
            <SettingsHeaderText
              className={b("SettingsFrame_HeaderFrame_Header")}
            >
              App Settings
            </SettingsHeaderText>
          </div>

          <section>
            <div>
              <FlatList
                list={settingsList}
                renderItem={(setting: Setting, idx: number) => (
                  <div key={idx}>{renderSettingItem(setting)}</div>
                )}
                renderWhenEmpty={() => <div>No settings available</div>}
              />
            </div>
          </section>

          <QuitButton type="button" onClick={() => electron.appApi.quitApp()}>
            Exit App
          </QuitButton>
        </div>
      </div>
    </div>
  );
};

export default withNavWrapper(Settings, { canReturn: true });
