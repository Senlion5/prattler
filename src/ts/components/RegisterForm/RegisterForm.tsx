import React, { FC } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/actions/auth";
import { initialValues, registerValidationSchema } from "./RegisterFormSchema";
import {
  ErrorTypography,
  HeaderText,
  SubheaderText,
  RegisterButton,
  ServerErrorTypography,
  StyledOutlinedInput,
  StyledText,
} from "./RegisterFormStyles";
import { cn } from "@bem-react/classname";
import "./RegisterForm.scss";

import { RegisterReq } from "../../interfaces/auth";

const b = cn("RegisterContainer");

const RegisterForm: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => auth.register.error);

  const onSubmit = (values: RegisterReq) => {
    dispatch(registerUser(values));
  };

  return (
    <div className={b("")}>
      <div className={b("Register")}>
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
          validationSchema={registerValidationSchema}
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

                <StyledText>Username</StyledText>
                <StyledOutlinedInput
                  type="username"
                  error={!!touched["username"] && !!errors["username"]}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="username"
                  name="username"
                />
                {errors.username && touched.username && (
                  <ErrorTypography>{errors.username}</ErrorTypography>
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

                <StyledText>Avatar</StyledText>
                <StyledOutlinedInput
                  type="avatar"
                  error={!!touched["avatar"] && !!errors["avatar"]}
                  onChange={handleChange}
                  fullWidth
                  id="avatar"
                  name="avatar"
                />
                <small style={{ color: "grey", fontStyle: "italic" }}>
                  * a web link (ending in .jpg .png) is optional
                </small>
                {errors.avatar && touched.avatar && (
                  <ErrorTypography>{errors.avatar}</ErrorTypography>
                )}

                {error && (
                  <ServerErrorTypography>{error.message}</ServerErrorTypography>
                )}

                <RegisterButton
                  type="submit"
                  disabled={
                    (!!errors.email && touched.email) ||
                    (!!errors.password && touched.password)
                  }
                >
                  Register
                </RegisterButton>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
