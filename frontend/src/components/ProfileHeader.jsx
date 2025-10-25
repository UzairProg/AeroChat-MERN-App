import React from 'react'
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import useAuthStore from '../store/useAuthStore.js'
import useChatStore from '../store/useChatStore.js'
import { useState } from 'react';


const ProfileHeader = () => {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = React.useRef(null);

  const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

    const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div>
      <div className='py-6 px-6 border-slate-700/50 border-b'>
        <div className='flex justify-center items-center'>

          <div className='flex gap-1 w-full justify-between items-center'>
            <div className='flex gap-2'>
              
              <div className='w-14 h-14 avatar avatar-online rounded-full '>
                <button
                  className="size-14 rounded-full overflow-hidden relative group"
                  onClick={() => fileInputRef.current.click()}
                  >
                  <img
                    src={selectedImg || authUser.profilePicture || "/avatar.png"}
                    alt="User image"
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs">Change</span>
                  </div>
                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className='flex flex-col justify-center items-start'>
                <h2 className='capitalize select-none text-base max-w-16 truncate text-slate-200'>{authUser.fullName}</h2>
                <h2 className='text-slate-500 text-[13px] select-none'>Online</h2>
              </div>
            </div>
            
            <div className='flex gap-3'>
            
            <div onClick={logout} className='hover:text-red-500/60 cursor-pointer transition-colors duration-200'>
              <LogOutIcon className='size-5'/>
            </div>
            
            <div onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }} className='cursor-pointer hover:text-slate-300/60 transition-colors duration-200'>
              {isSoundEnabled ? <Volume2Icon className='size-5'/> : <VolumeOffIcon className='size-5'/>}
            </div>

            </div>

          </div>

          
          
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
