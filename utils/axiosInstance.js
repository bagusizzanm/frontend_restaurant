import axios from "axios";
import { BASE_URL } from "./apiPath";
import toast from "react-hot-toast";

const toastStyleError = {
  position: "top-right",
  duration: 5000,
  style: {
    background: "#b91c1c",
    color: "#fff",
    padding: "10px",
    borderRadius: "10px",
  },
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized. Please, login again.");
        toast.error("Unauthorized. Please, login again.", toastStyleError);
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server error. Please, try again later.");
        toast.error("Server error. Please, try again later.", toastStyleError);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out. Please, try again later.");
      toast.error(
        "Request timed out. Please, try again later.",
        toastStyleError
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
