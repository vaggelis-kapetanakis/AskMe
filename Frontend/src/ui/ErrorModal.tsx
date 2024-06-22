import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import Button from "./Button";

interface ErrorModalProps {
  title?: string;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  title = "Something went wrong",
  message,
}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleOverlayClick = () => {
    handleClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div
        className="bg-white/20 backdrop-blur-lg rounded-lg shadow-lg p-5 z-10 w-1/3 relative"
        onClick={handleContentClick}
      >
        <button
          className="absolute top-2 right-2 bg-transparent"
          onClick={handleClose}
        >
          <BsX className="w-8 h-8 text-white" />
        </button>
        <h2 className="text-xl text-red-500 text-center bg-white/40 rounded-xl py-1">
          {title}
        </h2>
        <div className="mt-4 h-56 overflow-y-scroll text-lg p-3">
          <p>{message}</p>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <Button
            buttonVariant="solid"
            buttonStyle={{
              color: "primary",
              vPadding: "sm",
              rounded: "lg",
              size: "lg",
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
