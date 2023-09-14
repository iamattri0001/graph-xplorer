import toast from "react-hot-toast";

import toastSettings from "../toastSettings";

export const showMessage = (message, type, duration = 3000) => {
  if (type === "info") {
    toast(message, toastSettings);
  } else if (type === "error") {
    toast.error(message, toastSettings);
  } else if (type === "success") {
    toast.success(message, toastSettings);
  } else if (type === "loading") {
    const toastId = toast.loading(message, { ...toastSettings, duration });
    return toastId;
  } else {
    toast(message, toastSettings);
  }
};
