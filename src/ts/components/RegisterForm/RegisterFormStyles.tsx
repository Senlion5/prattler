import { Button, Typography, OutlinedInput, withStyles } from "@material-ui/core";

export const RegisterButton = withStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 13,
    background: "#7926a8",
    color: "#b7b9cc",
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 30,
    textTransform: "none",
    maxWidth: 320,
    width: "100%",
    maxHeight: 40,
    height: "100%",
    "&:hover": {
      backgroundColor: "#974cc2",
    }
  },
})(Button);

export const StyledText = withStyles({
  root: {
    display: "flex",
    fontSize: 12,
    height: 18,
    marginTop: 14,
    color: "#656565",
    fontWeight: 500,
  },
})(Typography);

export const HeaderText = withStyles({
  root: {
    display: "flex",
    fontSize: 18,
    height: 20,
    marginTop: 0,
    color: "#7926a8",
    fontWeight: 700,
  },
})(Typography);

export const SubheaderText = withStyles({
  root: {
    display: "flex",
    fontSize: 15,
    height: 18,
    marginTop: 14,
    marginBottom: 6,
    color: "#292727",
    fontWeight: 500,
  },
})(Typography);

export const LoginText = withStyles({
  root: {
    display: "flex",
    fontSize: 13,
    height: 18,
    marginTop: 16,
    color: "#656565",
    fontWeight: 400,
  },
})(Typography);

export const StyledOutlinedInput = withStyles({
  root: {
    maxWidth: 320,
    width: "100%",
    height: 40,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#EBEDF0",
    color: "#6B7785",
    marginTop: 2,
    fontSize: 14,
    boxSizing: "border-box",
  },
})(OutlinedInput);

export const ErrorTypography = withStyles({
  root: {
    fontWeight: 500,
    fontSize: 12,
    marginTop: 5,
    color: "#D14F4F",
  },
})(Typography);

export const ServerErrorTypography = withStyles({
  root: {
    fontWeight: 600,
    fontSize: 13,
    marginTop: 20,
    color: "#D14F4F",
  },
})(Typography);

