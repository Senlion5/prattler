import * as Yup from "yup";

export const initialValues = {
  email: "",
  username: "",
  password: "",
  avatar: "",
};

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalid email address")
    .required("enter your email"),
  username: Yup.string().min(1).max(12).required(),
  password: Yup.string().min(6).max(64).required(),
});
