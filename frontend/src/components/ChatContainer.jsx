import React from 'react'
import useChatStore from "../store/useChatStore.js";
import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen.jsx';
import ChatHeader from './ChatHeader.jsx'
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder.jsx';
import useAuthStore from '../store/useAuthStore.js';
import MessageInput from './MessageInput.jsx'

const ChatContainer = () => {
    const {
      selectedUser,
      getMessagesByUserId,
      messages,
      isMessagesLoading,
      subscribeToMessages,
      unsubscribeFromMessages,
    } = useChatStore();

    const { authUser } = useAuthStore()

    const { isFullScreen } = useChatStore()

  useEffect(() => {
    // if (selectedUser) {
      getMessagesByUserId();
    // }
  }, [selectedUser]);

  return (
    <div>
      {isMessagesLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <ChatHeader />
          <div className={`${isFullScreen ? "w-screen xl:w-full" : ""} relative`}> 

          {messages.length > 0 ? <div className='py-6 px-4 space-y-1'> {messages.map((msg) => (
            <div key={msg._id} className="">
              <div className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                  <div className={`chat-bubble ${msg.senderId === authUser._id ? "bg-cyan-900/30 text-white" : "bg-slate-800 text-slate-200"}`}>
                    {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                    )}
                    {msg.text && <p className="mt-2">{msg.text}</p>}
                    {/* msg createdAt */}
                    <p className="text-xs mt-1 opacity-65 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  </div>
              </div>
              
            </div>
          ))} </div> : <div className="h-full my-10"><NoChatHistoryPlaceholder name={selectedUser.fullName}  /></div>}
          </div>
          
          <MessageInput />
        </>
      )}
    </div>
  )
}

export default ChatContainer
