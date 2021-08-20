import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "../screens/HomeScreen/HomeScreen";
import Chat from "../screens/ChatScreen/ChatScreen";
import NewChat from "../screens/NewChatScreen/NewChatScreen";
import Settings from "../screens/SettingsScreen/SettingsScreen";
import Auth from "../screens/AuthScreen/AuthScreen";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <PrivateRoute
          render={(user) => (
            <Switch>
              <Route path="/home">
                <Home user={user} />
              </Route>
              <Route path="/newChat">
                <NewChat user={user} />
              </Route>
              <Route path="/chat/:id">
                <Chat user={user} />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          )}
        ></PrivateRoute>
      </Switch>
    </HashRouter>
  );
};

export default Routes;
