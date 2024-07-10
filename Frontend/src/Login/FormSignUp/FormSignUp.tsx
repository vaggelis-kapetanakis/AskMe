import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/useAuth";
import { signupSchema } from "../../utils/validationSchema";
import Button from "../../ui/Button";
import FormField from "../../components/FormField";
import { AuthProps } from "../../types/authTypes";
import { toast } from "react-toastify";

interface SignUpValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormSignUpProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSignUp: React.FC<FormSignUpProps> = ({ setLoading }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (
    values: SignUpValues,
    { setSubmitting }: FormikHelpers<SignUpValues>
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.post<AuthProps>(
        `${import.meta.env.VITE_APP_BACKEND_URL}/users/signup`,
        values
      );
      const userData = data;
      login(userData);
      navigate("/signedin");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error("Login failed:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const initialValues: SignUpValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSignup}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white/20 p-20 rounded-xl">
          <FormField name="email" label="Email" type="email" />
          <FormField name="username" label="Username" type="text" />
          <FormField name="password" label="Password" type="password" />
          <FormField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          <SignUpButton isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

interface SignUpButtonProps {
  isSubmitting: boolean;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ isSubmitting }) => (
  <Button
    buttonVariant="solid"
    buttonStyle={{
      color: "primary",
      vPadding: "sm",
      rounded: "lg",
      size: "lg",
    }}
    type="submit"
    disabled={isSubmitting}
  >
    Sign Up
  </Button>
);

export default FormSignUp;
