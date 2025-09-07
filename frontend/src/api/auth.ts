import axios from "axios"

const API_URL = "http://localhost/api"

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data
}

export const verifyToken = async (token: any) => {
  const response = await api.get("/auth/verify", {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export default api
