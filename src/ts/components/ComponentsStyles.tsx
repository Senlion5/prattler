import React from "react";
import {
  Button,
  ButtonProps,
  OutlinedInput,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";

export const MessageArea = withStyles({
  root: {
    color: "#8f3333",
    fontSize: 24,
    height: "auto",
    width: "90%",
    maxWidth: "90%",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 4,
    background: "#f4f5fa",
    fontWeight: 800,
    boxShadow: "1px 2px 10px 4px #a697aab9",
  },
})(TextField);

export const ComponentsTitleText = withStyles({
  root: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 24,
    height: 20,
    color: "#490d70",
    fontWeight: 700,
  },
})(Typography);

export const ComponentsHeaderText = withStyles({
  root: {
    display: "flex",
    fontSize: 16,
    height: 20,
    marginTop: 0,
    color: "#490d70",
    fontWeight: 700,
  },
})(Typography);

export const CardHeaderText = withStyles({
  root: {
    fontFamily: "Nunito",
    display: "flex",
    fontSize: 16,
    height: 20,
    marginTop: 20,
    color: "#7926a8",
    fontWeight: 700,
  },
})(Typography);

export const UserText = withStyles({
  root: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 16,
    height: 20,
    padding: 12,
    color: "#7926a8",
    fontWeight: 700,
  },
})(Typography);

export const ComponentsText = withStyles({
  root: {
    display: "flex",
    fontSize: 14.5,
    height: 22,
    marginTop: 16,
    marginBottom: 26,
    color: "#656565",
    fontWeight: 500,
  },
})(Typography);

export const StyledOutlinedInput = withStyles({
  root: {
    width: 260,
    maxWidth: 260,
    background: "#dddfeb",
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    color: "#4f19a7",
    fontWeight: 500,
    marginTop: 2,
    fontSize: 14,
    boxSizing: "border-box",

    "&:hover": {
      backgroundColor: "#dddfeb",
      color: "#4f19a7",
      borderColor: "#1e5697",
    },
  },
})(OutlinedInput);

export const BackButton = withStyles({
  root: {
    padding: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginLeft: 10,
    marginRight: 6,
    background: "#e4d47a",
    borderRadius: 6,
    fontWeight: 500,
    color: "#3c3d44",
    fontSize: 14,
    textTransform: "none",
    maxWidth: 120,
    maxHeight: 40,
    minWidth: 90,
    height: "100%",
    display: "flex",

    "&:hover": {
      backgroundColor: "#c4b75b",
      boxShadow: "none",
    },
  },
})(Button);

export const SettingsButton = withStyles({
  root: {
    padding: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginLeft: 6,
    marginRight: 6,
    background: "#dddfeb",
    borderWidth: 4,
    borderRadius: 6,
    fontWeight: 500,
    color: "#4f19a7",
    fontSize: 14,
    textTransform: "none",
    maxWidth: 420,
    width: "100%",
    maxHeight: 40,
    height: "100%",
    display: "flex",

    "&:hover": {
      backgroundColor: "#7226eb",
      boxShadow: "none",
      color: "#b7b9cc",
    },
  },
})((props: ButtonProps) => (
  <Button {...props} disableRipple disableFocusRipple />
));

export const LogoutButton = withStyles({
  root: {
    padding: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginLeft: 6,
    background: "#974cc2",
    borderRadius: 6,
    fontWeight: 500,
    color: "#b7b9cc",
    fontSize: 14,
    textTransform: "none",
    maxWidth: 420,
    width: "100%",
    maxHeight: 40,
    height: "100%",
    display: "flex",

    "&:hover": {
      backgroundColor: "#7e36a8",
      boxShadow: "none",
    },
  },
})(Button);
