import { toast } from "react-hot-toast";

export default function toastError(message: string) {
  toast(message, {
    position: "bottom-center",
    style: {
      backgroundColor: "red",
      color: "white",
      minWidth: "150px",
      minHeight: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
    },
  });
}
