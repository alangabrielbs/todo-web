import axios from "axios";
import { env } from "./env";

export const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.withCredentials = true;

  return config;
});
