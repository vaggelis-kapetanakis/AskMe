import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/useAuth";
import { loginSchema } from "../../utils/validationSchema";
import Button from "../../ui/Button";
import { AuthProps } from "../../types/authTypes";
import { useChart } from "../../contexts/useChart";
import { toast } from "react-toastify";

interface LoginValues {
  username: string;
  password: string;
}

interface FormLoginProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormLogin: React.FC<FormLoginProps> = ({ setLoading }) => {
  const { login } = useAuth();
  const { fetchChartData } = useChart();
  const navigate = useNavigate();

  const handleLogin = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.patch<AuthProps>(
        `${import.meta.env.VITE_APP_BACKEND_URL}/users/login`,
        values
      );
      login(data);
      await fetchChartData(data.userId);
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

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white/20 p-20 rounded-xl">
          <FormField name="username" label="Username" type="text" />
          <FormField name="password" label="Password" type="password" />
          <LoginButton isSubmitting={isSubmitting} />
        </Form>
      )}
    </Formik>
  );
};

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type }) => (
  <div className="flex items-start justify-center flex-col mb-5">
    <label className="text-xl" htmlFor={name}>
      {label}
    </label>
    <Field
      className="bg-white/40 rounded-lg w-96 pl-1 py-1"
      type={type}
      name={name}
    />
    <ErrorMessage
      className="text-red-500 mt-1 break-words"
      name={name}
      component="div"
    />
  </div>
);

interface LoginButtonProps {
  isSubmitting: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ isSubmitting }) => (
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
    Login
  </Button>
);

export default FormLogin;
