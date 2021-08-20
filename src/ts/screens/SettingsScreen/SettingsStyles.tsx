import { Button, Checkbox, Typography, FormControlLabel, withStyles } from "@material-ui/core";

export const QuitButton = withStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 13,
    background: "#7926a8",
    color: "#e6ebf3",
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 30,
    textTransform: "none",
    width: 120,
    maxWidth: 120,
    maxHeight: 40,
    height: "100%",
    "&:hover": {
      backgroundColor: "#b83434",
    }
  },
})(Button);

export const SettingsHeaderText = withStyles({
    root: {
      display: "flex",
      fontSize: 17,
      height: 20,
      marginTop: 12,
      color: "#7926a8",
      fontWeight: 700,
    },
})(Typography);

export const SettingsText = withStyles({
    root: {
      display: "flex",
      fontSize: 12,
      height: 18,
      marginTop: 20,
      color: "#656565",
      fontWeight: 500,
    },
})(Typography);

export const StyledCheckbox = withStyles({
    root: {
      "&:hover": {
        backgroundColor: "transparent",
      },
      "& .MuiIconButton-label": {
        color: "#33475D",
      },
      "&.MuiIconButton-root.Mui-checked": {
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
})(Checkbox);

export const StyledFormControlLabel = withStyles({
    root: {
      fontWeight: 500,
      fontSize: 12,
      width: 300,
      maxWidth: 300,
      color: "#6B7785",
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
})(FormControlLabel);
