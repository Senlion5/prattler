import React from "react";

import { Button, ButtonProps, withStyles } from "@material-ui/core";

export const SettingsButton = withStyles({
  root: {
    padding: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginLeft: 10,
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

export const StyledButton = withStyles({
  root: {
    padding: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginLeft: 10,
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

export const BackButton = withStyles({
  root: {
    padding: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginLeft: 10,
    background: "#e4d47a",
    borderRadius: 6,
    fontWeight: 500,
    color: "#3c3d44",
    fontSize: 14,
    textTransform: "none",
    maxWidth: 120,
    maxHeight: 40,
    height: "100%",
    display: "flex",

    "&:hover": {
      backgroundColor: "#c4b75b",
      boxShadow: "none",
    },
  },
})(Button);

export const JoinChatButton = withStyles({
  root: {
    padding: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginBottom: 16,
    background: "#299e67",
    borderRadius: 6,
    fontWeight: 500,
    color: "#d5e2f1",
    fontSize: 14,
    textTransform: "none",
    maxWidth: 160,
    maxHeight: 40,
    height: "100%",
    display: "flex",

    "&:hover": {
      backgroundColor: "#198050",
      boxShadow: "none",
    },
  },
})(Button);

export const CreateButton = withStyles({
  root: {
    padding: 12,
    paddingRight: 24,
    paddingLeft: 24,
    background: "#299e67",
    borderRadius: 6,
    fontWeight: 500,
    color: "#d5e2f1",
    fontSize: 14,
    textTransform: "none",
    width: 98,
    maxWidth: 160,
    maxHeight: 40,
    height: "100%",
    display: "flex",

    "&:hover": {
      backgroundColor: "#198050",
      boxShadow: "none",
    },
  },
})(Button);
