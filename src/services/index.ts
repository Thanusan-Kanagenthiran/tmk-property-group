import { API_BASE_URL } from "@/constants/api";
import axios, { AxiosInstance } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }

  
});

export default axiosClient;
