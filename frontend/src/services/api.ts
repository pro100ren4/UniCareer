import axios from "axios"
import type { InternalAxiosRequestConfig } from "axios"
import { useAuthStore } from "../store/authStore"

const api = axios.create({
  baseURL: "http://localhost:5050/api",
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token
    if (token && config.headers) {
      if (typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`)
      } else {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }
    }
    return config
  }
)

export default api
