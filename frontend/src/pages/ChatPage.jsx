import React from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx'
import ProfileHeader from "../components/ProfileHeader.jsx"
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx'
import ChatsList from '../components/ChatsList.jsx'
import ContactList from '../components/ContactList.jsx'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import useChatStore from "../store/useChatStore.js"
import { Maximize2, Minimize2 } from 'lucide-react'
import { useRef, useEffect } from 'react'


const ChatPage = () => {
  const { activeTab, selectedUser, isFullScreen, setSelectedUser, toggleFullScreen, setFullScreen } = useChatStore()
  const wrapperRef = useRef(null)

  // Handle fullscreen change events to keep store in sync
  useEffect(() => {
    const onFsChange = () => {
      setFullScreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [setFullScreen])

  const handleToggleFullscreen = async () => {
    // Use desktop breakpoint (md) approx 768px
    const isDesktop = window.innerWidth >= 768
    try {
      if (isDesktop) {
        if (!document.fullscreenElement) {
          // request fullscreen on the wrapper
          if (wrapperRef.current && wrapperRef.current.requestFullscreen) {
            await wrapperRef.current.requestFullscreen()
            // setFullScreen will be updated by the fullscreenchange listener
          } else if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen()
          }
        } else {
          if (document.exitFullscreen) await document.exitFullscreen()
        }
      } else {
        // mobile: fallback to CSS-driven fullscreen
        toggleFullScreen()
      }
    } catch (err) {
      console.error('Fullscreen toggle failed', err)
    }
  }
  return (
    <div className={`${isFullScreen ? 'fixed inset-0 z-50 w-full h-full' : 'absolute inset-0 w-full h-screen'} flex justify-center items-center ${isFullScreen ? 'p-0' : 'p-6'}`}>
      <BorderAnimatedContainer className={`overflow-hidden ${isFullScreen ? 'rounded-none h-full' : 'rounded-xl'}`}>

  <div ref={wrapperRef} className={`${isFullScreen ? 'h-full w-full' : 'w-[94vw]'} premium-panel ${isFullScreen ? '' : 'max-w-6xl md:w-[80vw] md:max-w-5xl rounded-xl'} h-full flex flex-col md:flex-row min-h-[75vh] md:min-h-[80vh]`}>

          {/* Desktop-only floating fullscreen toggle (bottom-right) */}
          <button
            onClick={() => handleToggleFullscreen()}
            className="hidden md:flex absolute right-4 bottom-4 z-50 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700/60 items-center justify-center transition-colors"
            aria-label="Toggle fullscreen"
          >
            {isFullScreen ? (
              <Minimize2 className="w-5 h-5 text-slate-200" />
            ) : (
              <Maximize2 className="w-5 h-5 text-slate-200" />
            )}
          </button>

          {/* left: sidebar */}
          <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/4 min-h-full bg-slate-800/50 backdrop-blur-sm`}>
            <ProfileHeader />
            <ActiveTabSwitch className="w-full"/>

            <div className='flex-1 overflow-y-auto p-4 space-y-2'>
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* right: chat box */}
          <div className='flex-1 flex flex-col h-full backdrop-blur-sm bg-slate-900/50'>
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>

        </div>

      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage
