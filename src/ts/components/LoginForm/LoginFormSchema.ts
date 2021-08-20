import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("invalid email address").required("enter your email"),
  password: Yup.string().min(6).max(64).required(),
});