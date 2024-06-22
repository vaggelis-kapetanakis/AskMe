// src/utils/validationSchema.ts
import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .required("Password is required"),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .test("Passwords match", "Passwords dont match", function (value) {
      return this.parent.password === value;
    })
    .required("Confirm Password is required"),
});
