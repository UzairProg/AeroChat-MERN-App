import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

const useAuthStore = create((set) => ({
  authUser: null,
  isAuthenticatedCheck: false,
  isSigningUp: false,

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
  }
  
}))

export default useAuthStore
