import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserData } from "../interfaces/auth";

const PrivateRoute: FC<{
  render: (user: UserData) => JSX.Element;
}> = ({ render, ...rest }) => {
  const user = useSelector(({ auth }) => auth.user.user);

  return (
    <Route
      {...rest}
      render={(props) => (user ? render(user) : <Redirect to="/" />)}
    />
  );
};

export default PrivateRoute;
