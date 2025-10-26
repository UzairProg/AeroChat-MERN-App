import React from 'react'
import useChatStore from '../store/useChatStore'
import { X } from 'lucide-react';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore()
  return (
    <div className='bg-slate-800/80 w-full h-16 border-b border-slate-700/50 flex items-center px-4 justify-between pr-8'>
        <div className='flex gap-3'>
            <div className='size-12 rounded-full avatar avatar-online'>
                <img src={`${selectedUser.profilePicture || "/avatar.png"}`} alt="pfp"  />
            </div>
            <div className='flex flex-col items-start justify-center mt-2'>
                <h2 className='capitalize select-none leading-4 max-w-24 text-slate-200 truncate'>{selectedUser.fullName}</h2>
                <h2 className='text-slate-500 text-[13px] select-none'>Online</h2>
            </div>
        </div>

        <X onClick={() => setSelectedUser(null)} className='cursor-pointer hover:text-red-400/80 size-6 text-slate-500 transition-colors duration-150'/>

    </div>
  )
}

export default ChatHeader
