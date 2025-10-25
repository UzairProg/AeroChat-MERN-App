import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

const useAuthStore = create((set) => ({
  authUser: null,
  isAuthenticatedCheck: false,
  isSigningUp: false,
  isloggingIn: false,

  checkUserAuth: async function(){
    try {
      const user = await axiosInstance.get("/auth/check-auth")
      set({ authUser: user.data })
      set({ isAuthenticated: true })
    } catch (error) {
      set({ authUser: null})
    } finally{
      set({ isAuthenticatedCheck: true})
    }
  },

  userSignUp: async (data) => {
    set({ isSigningUp: true})
    try {
      const res = await axiosInstance.post("/auth/signup", data)
      set({ authUser: res.data })

      toast.success("Account created successfully!")
    } catch (error) {
      set({ authUser: null })
      toast.error(error.response.data.message)
    } finally{
      set({ isSigningUp: false})
    }
  },

  userLogin: async (data) => {
    set({ isloggingIn: true})
    try {
      const res = await axiosInstance.post("/auth/login", data)
      set({ authUser: res.data })

      toast.success("Logged in successfully!")
    } catch (error) {
      set({ authUser: null })
      toast.error(error.response.data.message)
    } finally{
      set({ isloggingIn: false})
    }
  }
  
}))

export default useAuthStore
