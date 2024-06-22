import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { LoginProps } from "../Login";

const RightOverlayContent = ({ isAnimated, setIsAnimated }: LoginProps) => {
  const navigate = useNavigate();
  return (
    <div className="p-8 text-center flex items-center justify-center flex-col">
      <h1 className="text-6xl font-bold text-white mb-4">
        Don't have an account ?
      </h1>

      <h5 className="text-xl text-white">Start your journey in one click</h5>
      <div className="w-96 mt-16 flex flex-row items-center justify-between">
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
          Sign Up
        </Button>
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
      </div>
    </div>
  );
};

export default RightOverlayContent;
