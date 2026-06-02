import * as yup from "yup";

export const userSchema = yup.object({

  name: yup
    .string()
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),

  password: yup
    .string()
    .min(7, "Minimum 7 characters")
    .max(13,"Maximum 12 characters")
    .required("Password is required"),

});