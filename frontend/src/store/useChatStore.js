import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const useChatStore = create((set,get) => ({
    contacts: [],
    chats: [],
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
            console.log(fetchedChatPartners)
            set({ chats: fetchedChatPartners.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({ isUsersLoading: false })
        }
    }
}))

export default useChatStore