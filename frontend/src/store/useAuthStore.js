import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

const useAuthStore = create((set) => ({
  authUser: null,
  isAuthenticatedCheck: false,
  isSigningUp: false,
  isloggingIn: false,
  islogginOut: false,

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
  },

  logout: async () =>{
    try {
      set({ islogginOut: true })
      await axiosInstance.post("/auth/logout")
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally{
      set({ islogginOut: false })
    }
  },

  updateProfile: async (data) =>{
    try {
      const res =  await axiosInstance.put("/auth/update-profile", data)
      set({ authUser: res.data })
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

  
}))

export default useAuthStore
