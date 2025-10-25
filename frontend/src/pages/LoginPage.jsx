import React from 'react'
import useAuthStore from '../store/useAuthStore.js'

const LoginPage = () => {
  const {isLoggedIn, login} = useAuthStore();
  return (
    <div
    className='z-1'
    >
      <h1>login page</h1>
      <button
      onClick={() => {
        console.log(isLoggedIn)
        login();
        console.log(isLoggedIn)
      }}
      >
        Login
      </button>
    </div>
  )
}

export default LoginPage
