import * as Yup from "yup";

export const initialValues = {
  title: "",
  description: "",
  image: "",
};

export const newChatValidationSchema = Yup.object().shape({
  title: Yup.string().min(1).max(24).required(),
  description: Yup.string().min(1).max(64).required(),
  image: Yup.string(),
});