import React, { FC } from "react";
import withNavWrapper from "../../wrappers/withNavWrapper";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { newChat } from "../../store/actions/chats";
import { useHistory } from "react-router-dom";
import { initialValues, newChatValidationSchema } from "./NewChatSchema";
import {
  ErrorTypography,
  HeaderText,
  SubheaderText,
  CreateButton,
  DescriptionInput,
  StyledOutlinedInput,
  StyledText,
} from "./NewChatStyles";
import { cn } from "@bem-react/classname";
import "./NewChatScreen.scss";

import { CreateChatData } from "../../interfaces/chats";
import { UserData } from "src/ts/interfaces/auth";

const b = cn("NewChatContainer");

const NewChat: FC<{ user: UserData }> = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (values: CreateChatData) => {
    newChat(values, user.uid)(dispatch).then((_: any) => history.push("/home"));
  };

  return (
    <div className={b("")}>
      <div className={b("NewChat")}>
        <div className={b("Logo")}>
          <img
            src="assets/images/pr.svg"
            alt="SVG"
            height="70px"
            width="70px"
          />
        </div>

        <HeaderText className={b("Header")}>Create New Chat</HeaderText>
        <SubheaderText className={b("Subheader")}>
          A simple way to chat with your friends
        </SubheaderText>

        <div className={b("NewChat_InputData")}>
          <Formik
            initialValues={initialValues}
            validationSchema={newChatValidationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, handleSubmit, handleChange }) => {
              return (
                <form onSubmit={handleSubmit} noValidate autoComplete="false">
                  <StyledText>Title</StyledText>
                  <StyledOutlinedInput
                    type="text"
                    error={!!touched["title"] && !!errors["title"]}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="title"
                    name="title"
                  />
                  {errors.title && touched.title && (
                    <ErrorTypography>{errors.title}</ErrorTypography>
                  )}

                  <StyledText>Description</StyledText>
                  <DescriptionInput
                    type="text"
                    error={!!touched["description"] && !!errors["description"]}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rowsMin={2}
                    maxRows={2}
                    id="description"
                    name="description"
                    style={{ lineHeight: 1.6 }}
                  />
                  {errors.description && touched.description && (
                    <ErrorTypography>{errors.description}</ErrorTypography>
                  )}

                  <StyledText>Image</StyledText>
                  <StyledOutlinedInput
                    type="text"
                    error={!!touched["image"] && !!errors["image"]}
                    onChange={handleChange}
                    required
                    fullWidth
                    id="image"
                    name="image"
                  />
                  <small style={{ color: "grey", fontStyle: "italic" }}>
                    * a web link (ending in .jpg .png) is optional
                  </small>
                  {errors.image && touched.image && (
                    <ErrorTypography>{errors.image}</ErrorTypography>
                  )}

                  <CreateButton type="submit">Create</CreateButton>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default withNavWrapper(NewChat, { canReturn: true });
