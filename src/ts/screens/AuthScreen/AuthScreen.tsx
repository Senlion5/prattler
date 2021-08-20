import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { RegisterText } from "./AuthScreenStyles";
import { cn } from "@bem-react/classname";
import "./AuthScreen.scss";

const b = cn("AuthContainer");

const Auth: FC = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const user = useSelector(({ auth }) => auth.user.user);

  const optLoginText = isLoginForm
    ? ["Not registered yet?", "Create your account"]
    : ["Already registered?", "Login"];

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={b("")}>
      {isLoginForm ? <LoginForm /> : <RegisterForm />}
      <div>
        <RegisterText className={b("AfterText")}>
          {optLoginText[0]}
          <span
            onClick={() => setIsLoginForm(!isLoginForm)}
            className={b("Link")}
          >
            {optLoginText[1]}
          </span>
        </RegisterText>
      </div>
    </div>
  );
};

export default Auth;
