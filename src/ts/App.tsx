import React, { FC, useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import configureStore from "./store";
import Routes from "./routing/Routes";
import Loading from "./components/Loading/Loading";

import { listenToAuthChanges } from "./store/actions/auth";
import { listenToConnectionChanges } from "./store/actions/network";
import { checkUserConnection } from "./store/actions/connection";
import { loadInitialSettings } from "./store/actions/settings";

import { cn } from "@bem-react/classname";
import "./App.scss";

interface ThemeProps {
  setTheme: (isDarkTheme: boolean) => void;
}

const b = cn("MainContainer");

const PrattlerApp: FC<ThemeProps> = ({ setTheme }) => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const networkStatus = useSelector(({ network }) => network.status);
  const user = useSelector(({ auth }) => auth.user.user);

  const isDarkTheme = useSelector(
    ({ settings }) => settings.dict["isDarkTheme"] === "true"
  );

  useEffect(() => {
    setTheme(isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    dispatch(loadInitialSettings());
    const unsubscribeFromAuth = dispatch(listenToAuthChanges());
    const unsubscribeFromConnection = dispatch(listenToConnectionChanges());

    return () => {
      dispatch(unsubscribeFromAuth);
      dispatch(unsubscribeFromConnection);
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubscribeFromUserConnection;
    if (user?.uid) {
      unsubscribeFromUserConnection = dispatch(checkUserConnection(user.uid));
    }
    return () => {
      unsubscribeFromUserConnection && unsubscribeFromUserConnection();
    };
  }, [dispatch, user]);

  if (networkStatus !== true) {
    return <Loading message="No Internet Connection ..." />;
  }

  if (isChecking) {
    return <Loading message="Wait a second, please ..." />;
  }

  return (
    <HashRouter>
      <Switch>
        <Route component={Routes} />
      </Switch>
    </HashRouter>
  );
};

const store = configureStore();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const setTheme = (theme: boolean) => {
    setIsDarkTheme(theme);
  };

  return (
    <div className={b("", isDarkTheme ? ["Dark"] : [""])}>
      <Provider store={store}>
        <PrattlerApp setTheme={setTheme} />
      </Provider>
    </div>
  );
};

export default App;
