import React from 'react'
import { LoaderCircle } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div
    className='flex justify-center items-center min-h-screen'
    >
      <LoaderCircle className='size-8 animate-spin'/>
    </div>
  )
}

export default LoadingScreen
