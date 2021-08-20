import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/auth";
import { Formik } from "formik";
import { initialValues, loginValidationSchema } from "./LoginFormSchema";
import {
  ErrorTypography,
  HeaderText,
  SubheaderText,
  LoginButton,
  ServerErrorTypography,
  StyledOutlinedInput,
  StyledText,
} from "./LoginFormStyles";
import { cn } from "@bem-react/classname";
import "./LoginForm.scss";

import { LoginReq } from "../../interfaces/auth";

const b = cn("LoginContainer");

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => auth.login.error);

  const onSubmit = (values: LoginReq) => {
    dispatch(loginUser(values));
  };

  return (
    <div className={b("")}>
      <div className={b("Login")}>
        <div className={b("Logo")}>
          <img
            src="assets/images/pr.svg"
            alt="SVG"
            height="70px"
            width="70px"
          />
        </div>

        <HeaderText className={b("Header")}>Welcome to Prattler!</HeaderText>
        <SubheaderText className={b("Subheader")}>
          A simple way to chat with your friends
        </SubheaderText>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, handleSubmit, handleChange }) => {
            return (
              <form onSubmit={handleSubmit} noValidate autoComplete="false">
                <StyledText>Email</StyledText>
                <StyledOutlinedInput
                  type="email"
                  error={!!touched["email"] && !!errors["email"]}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="email"
                  name="email"
                />
                {errors.email && touched.email && (
                  <ErrorTypography>{errors.email}</ErrorTypography>
                )}

                <StyledText>Password</StyledText>
                <StyledOutlinedInput
                  type="password"
                  error={!!touched["password"] && !!errors["password"]}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="password"
                  name="password"
                />
                {errors.password && touched.password && (
                  <ErrorTypography>{errors.password}</ErrorTypography>
                )}

                {error && (
                  <ServerErrorTypography>{error.message}</ServerErrorTypography>
                )}

                <LoginButton
                  type="submit"
                  disabled={
                    (!!errors.email && touched.email) ||
                    (!!errors.password && touched.password)
                  }
                >
                  Login
                </LoginButton>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
