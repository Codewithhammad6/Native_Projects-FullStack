import axios from "axios";
import useStore from "../store/userStore.ts"; // adjust path

const axiosInstance = axios.create({
  baseURL: "http://10.0.2.2:5000/api/v1",
  withCredentials: true,
});

// Add Authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  const token = useStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
