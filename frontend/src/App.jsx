import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ChatPage from './pages/ChatPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import useAuthStore from './store/useAuthStore.js'
import { useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { authUser, isAuthenticatedCheck, checkUserAuth } = useAuthStore()

  useEffect(() => {
    checkUserAuth();
  },[checkUserAuth]);

  if(!isAuthenticatedCheck) return <LoadingScreen />

  return (
    <div
    className='relative flex justify-center items-center min-h-screen overflow-hidden'
    >
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
