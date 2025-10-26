import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useChatStore = create((set,get) => ({
    contacts: [],
    chats: [],
    messages: [],
    isFullScreen: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,
    selectedUser: null,
    activeTab: "chats",
    isUsersLoading: false,
    isMessagesLoading: false,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => {
        set({ activeTab: tab })
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser })
    },

    // fullscreen controls for chat page
    setFullScreen: (value) => set({ isFullScreen: value }),
    toggleFullScreen: () => set({ isFullScreen: !get().isFullScreen }),

    getAllContacts: async () => {
        try {
            set({ isUsersLoading: true })
            const fetchedContacts = await axiosInstance.get("/messages/contacts")
            set({ contacts: fetchedContacts.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({ isUsersLoading: false })
        }
        
    },

    getMyChatPartners: async () => {
        try {
            set({ isUsersLoading: true })
            const fetchedChatPartners = await axiosInstance.get("/messages/chats")
            
            set({ chats: fetchedChatPartners.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({ isUsersLoading: false })
        }
    },

    getMessagesByUserId: async () =>{
        try {
            set({ isMessagesLoading: true })
            // console.log(get().selectedUser)
            const selectedUserId = get().selectedUser._id
            // console.log(selectedUserId)
            let res = await axiosInstance.get(`/messages/${selectedUserId}`)
            // console.log(res.data)
            // store messages separately so we don't overwrite chat partners
            set({ messages: res.data })
            // console.log(get().chats, typeof get().chats)
        } catch (error) {
            toast.error("Failed to fetch messages, Server error.")
            console.log(error)
        } finally {
            set({ isMessagesLoading: false })
        }
        

    }
}))

export default useChatStore