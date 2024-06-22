import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { signupSchema } from "../../utils/validationSchema";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const FormSignUp = ({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://askmeback.onrender.com/qanda/users/signup",
        values
      );
      const userData = response.data;
      authContext?.login(userData);

      // Navigate to /signedin after successful sign up
      navigate("/signedin");
      setLoading(false);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={handleSignup}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white/20 p-20 rounded-xl">
            <div className="flex items-start justify-center flex-col mb-5">
              <label className="text-xl" htmlFor="email">
                Email
              </label>
              <Field
                className="bg-white/40 rounded-lg w-96 pl-1 py-1"
                type="email"
                name="email"
              />
              <ErrorMessage
                className="text-red-500 mt-1"
                name="email"
                component="div"
              />
            </div>
            <div className="flex items-start justify-center flex-col mb-5">
              <label className="text-xl" htmlFor="username">
                Username
              </label>
              <Field
                className="bg-white/40 rounded-lg w-96 pl-1 py-1"
                type="username"
                name="username"
              />
              <ErrorMessage
                className="text-red-500 mt-1"
                name="username"
                component="div"
              />
            </div>
            <div className="flex items-start justify-center flex-col mb-5">
              <label className="text-xl" htmlFor="password">
                Password
              </label>
              <Field
                className="bg-white/40 rounded-lg w-96 pl-1 py-1"
                type="password"
                name="password"
              />
              <ErrorMessage
                className="text-red-500 mt-1 break-words"
                name="password"
                component="div"
              />
            </div>
            <div className="flex items-start justify-center flex-col mb-5">
              <label className="text-xl" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Field
                className="bg-white/40 rounded-lg w-96 pl-1 py-1"
                type="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage
                className="text-red-500 mt-1 break-words"
                name="confirmPassword"
                component="div"
              />
            </div>
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
              SignUp
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormSignUp;
