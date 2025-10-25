import React from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx'
import ProfileHeader from "../components/ProfileHeader.jsx"
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx'
import ChatsList from '../components/ChatsList.jsx'
import ContactList from '../components/ContactList.jsx'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import useChatStore from "../store/useChatStore.js"


const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore()
  return (
    <div className='absolute inset-0 w-full h-screen flex justify-center items-center p-6'>
      <BorderAnimatedContainer className='rounded-xl overflow-hidden'>

        <div className="bg-slate-900/80 backdrop-blur-sm w-[90vw] max-w-4xl md:min-w-[70vw] rounded-xl flex flex-col md:flex-row min-h-[70vh] md:min-h-[40vw]">

          {/* left: sidebar */}
          <div className='w-1/4 min-h-full bg-slate-800/50 backdrop-blur-sm'>
            <ProfileHeader />
            <ActiveTabSwitch className="w-full"/>

            <div className='flex-1 overflow-y-auto p-4 space-y-2'>
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* right: chat box */}
          <div className='flex-1 flex flex-col backdrop-blur-sm bg-slate-900/50'>
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>

        </div>

      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage
