import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../../store/actions/auth";
import { cn } from "@bem-react/classname";
import { BackButton, SettingsButton, LogoutButton } from "../ComponentsStyles";
import "./NavBar.scss";

interface NavBarProps {
  canReturn: boolean;
  view: string;
}

const b = cn("Navbar");

const NavBar: FC<NavBarProps> = ({ canReturn, view }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user.user);

  return (
    <div className={b("")}>
      <div className={b("Inner")}>
        <div className={b("Inner_left")}>
          {user && (
            <>
              <div>
                {user.avatar ? (
                  <img
                    className={b("Inner_left_img")}
                    src={user.avatar}
                    alt="User_Avatar"
                  />
                ) : (
                  <img
                    className={b("Inner_left_img")}
                    src="assets/images/blank_profile.jpg"
                    alt="User_Avatar"
                  />
                )}
              </div>
              <div
                className={b("Inner_user")}
              >{`Welcome, ${user.username}!`}</div>
            </>
          )}
        </div>
        <div className={b("Inner_right")}>
          {canReturn && (
            <BackButton onClick={() => history.goBack()}>Return</BackButton>
          )}
          {view !== "Settings" && (
            <SettingsButton
              onClick={() => {
                history.push("/settings");
              }}
            >
              Settings
            </SettingsButton>
          )}
          {user && (
            <LogoutButton onClick={() => dispatch(logoutUser())}>
              Logout
            </LogoutButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
