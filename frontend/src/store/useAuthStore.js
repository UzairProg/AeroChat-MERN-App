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
      toast.error(error?.response?.data?.message || "Signup failed, please try again.")
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
      toast.error(error?.response?.data?.message || "Login failed, please try again.")
    } finally{
      set({ isloggingIn: false})
    }
  },

  logout: async () =>{
    try {
      set({ islogginOut: true })
      await axiosInstance.post("/auth/logout")
      // clear client-side auth state and redirect to login
      set({ authUser: null, isAuthenticatedCheck: false })
      toast.success("Logged out successfully")
      // small delay so toast is visible before redirect
      setTimeout(() => {
        window.location.href = '/login'
      }, 300)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed, Something went wrong.")
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
      toast.error(error?.response?.data?.message || "Profile update failed, please try again.")
    }
  },

  
}))

export default useAuthStore
