import { create } from "zustand"
import axios from "axios"

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  login: async (email, password) => {
    const res = await axios.post("http://localhost/api/auth/login", { email, password })
    const token = res.data.token
    set({ token, isAuthenticated: true })
    localStorage.setItem("token", token)
  },

  logout: () => {
    set({ token: null, isAuthenticated: false })
    localStorage.removeItem("token")
  },
}))
