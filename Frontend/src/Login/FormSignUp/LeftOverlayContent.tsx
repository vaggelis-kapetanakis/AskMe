import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { LoginProps } from "../Login";

const LeftOverlayContent = ({ isAnimated, setIsAnimated }: LoginProps) => {
  const navigate = useNavigate();
  return (
    <div className="p-8 text-center flex items-center justify-center flex-col">
      <h1 className="text-6xl font-bold text-white mb-4">
        Already have an account ?
      </h1>

      <h5 className="text-xl text-white">Sign in with your email & password</h5>
      <div className="w-96 mt-16 flex flex-row items-center justify-between">
        <Button
          buttonVariant="solid"
          buttonStyle={{
            color: "primary",
            vPadding: "sm",
            rounded: "lg",
            size: "lg",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </Button>
        <Button
          buttonVariant="outline"
          buttonStyle={{
            color: "primary",
            vPadding: "sm",
            rounded: "lg",
            size: "lg",
          }}
          onClick={() => {
            setIsAnimated(!isAnimated);
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
