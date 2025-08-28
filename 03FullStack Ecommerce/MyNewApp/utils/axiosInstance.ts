
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://10.0.2.2:5000/api",      // when use simulator
baseURL: "http://192.168.100.12:5000/api",
  withCredentials: true,
});

export default axiosInstance;
 