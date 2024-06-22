import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { loginSchema } from "../../utils/validationSchema";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { ChartContext } from "../../contexts/ChartContext";

const FormLogin = ({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const authContext = useContext(AuthContext);
  const chartContext = useContext(ChartContext);
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        "https://askmeback.onrender.com/qanda/users/login",
        values
      );
      const userData = response.data;
      authContext?.login(userData);

      // Fetch additional user data
      if (chartContext) {
        chartContext.fetchChartData(userData.userId);
      }

      // Navigate to /signedin after successful login
      navigate("/signedin");
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white/20 p-20 rounded-xl">
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
            {/* <div className="flex items-start justify-center flex-col mb-5">
              <label className="flex items-center justify-center">
                <Field
                  className="w-5 h-5 mr-3"
                  type="checkbox"
                  name="rememberMe"
                />
                Remember Me
              </label>
            </div> */}
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormLogin;
