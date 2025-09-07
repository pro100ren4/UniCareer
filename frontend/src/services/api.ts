import axios from "axios"
import { useAuthStore } from "../store/authStore"

const api = axios.create({
  baseURL: "/",
})

api.interceptors.request.use((config: any) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return config;
})


export default api
