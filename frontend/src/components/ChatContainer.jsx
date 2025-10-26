import React from 'react'
import useChatStore from "../store/useChatStore.js";
import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader.jsx'
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder.jsx';
import useAuthStore from '../store/useAuthStore.js';
import MessageInput from './MessageInput.jsx'
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton.jsx';

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
    const endRef = useRef(null)

  useEffect(() => {
    // fetch messages when selected user changes
    getMessagesByUserId();
  }, [selectedUser, getMessagesByUserId]);

  // auto-scroll to bottom whenever messages change
  useEffect(() => {
    // small timeout to ensure DOM has rendered
    const t = setTimeout(() => {
      if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 50)
    return () => clearTimeout(t)
  }, [messages])

  return (
    <div className="flex flex-col">
      {isMessagesLoading ? (
        <MessagesLoadingSkeleton />
      ) : (
        <>
          <ChatHeader />

          {/* messages pane - responsive heights: use available space; on small screens cap with vh */}
          <div className={`${isFullScreen ? "w-screen xl:w-full min-h-full" : ""} relative flex-1 overflow-y-auto max-h-[75vh] md:max-h-[70vh] scrollbar-hidden`}> 

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
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) : ""}
                  </p>
                  </div>
              </div>
              
            </div>
          ))} </div> : <div className="min-h-[70vh] overflow-y-hidden"><NoChatHistoryPlaceholder name={selectedUser?.fullName}  /></div>}

          <div ref={endRef} />
          </div>

          <div className="border-t border-slate-700/50">
            <MessageInput />
          </div>
        </>
      )}
    </div>
  )
}

export default ChatContainer
