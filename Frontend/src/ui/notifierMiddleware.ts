import { toast, ToastOptions, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifierMiddleware = (
  type: "info" | "success" | "warning" | "error",
  message: string,
  options?: ToastOptions,
  position: ToastPosition = "top-right"
) => {
  const toastOptions = { ...options, position };

  switch (type) {
    case "info":
      toast.info(message, toastOptions);
      break;
    case "success":
      toast.success(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
      break;
  }
};

export default notifierMiddleware;
