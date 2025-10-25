import React from 'react'
import useAuthStore from '../store/useAuthStore.js'
import { useState } from 'react';
import {
  MessageCircle,
  LockIcon,
  MailIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from 'react-router-dom';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx';

const LoginPage = () => {
  const {isloggingIn, userLogin} = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: ""})

  const handleSumbit = (e) => {
    e.preventDefault()
    userLogin(formData)
  }

  return (
    <div className='absolute inset-0 w-full h-screen flex justify-center items-center p-6'>
        <BorderAnimatedContainer className='overflow-hidden'>
          <div className="bg-slate-900/80 w-[90vw] backdrop-blur-sm max-w-4xl md:w-[70vw] px-5 py-2 lg:p-2 rounded-xl flex flex-col md:flex-row min-h-[70vh] md:min-h-[40vw]">
            {/* left section */}
            <div className='w-full md:w-1/2 border-slate-800/70 md:border-r px-10 py-22 h-full'>
              <div className='flex flex-col justify-center items-center gap-2 mb-6'>
                <div>
                  <MessageCircle className="w-12 h-12 text-slate-400 text-center"/>
                </div>
                <div>
                  <h2 className="font-bold text-2xl text-slate-200 select-none text-center my-1">Welcome Back</h2>
                  <h2 className="font-semibold text-center text-sm text-slate-400 select-none">Login to access your account</h2>
                </div>

              </div>

              <form onSubmit={handleSumbit} className="space-y-6">
                
                <div>
                  <label className="auth-input-label">Email</label>
                  <div className="relative">
                    <MailIcon className="auth-input-icon" />

                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input"
                      placeholder="johndoe@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="auth-input-label">Password</label>
                  <div className="relative">
                    <LockIcon className="auth-input-icon" />

                    <input
                      type="text"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="input"
                      placeholder="Enter your Password"
                    />
                  </div>
                </div>      

                <button className="auth-btn mt-6 md:mt-4" type="submit" disabled={isloggingIn}>
                {isloggingIn ? (
                  <LoaderIcon className="w-full h-5 animate-spin text-center" />
                ) : (
                  "Login"
                )}
              </button>

              <div className="mt-4 text-center">
              <Link to="/signup" className="auth-link">
                Dont have an account? SignUp
              </Link>
            </div>

              </form>
            </div>

            {/* right section */}
            <div
            className='hidden md:flex w-1/2 px-8 flex-col justify-center'
            >
              <div>
                <img src="/login.png" alt="" srcset="" />
              </div>
              <div className='flex flex-col gap-4'>
                <h2 className="text-2xl text-center font-bold text-blue-500/70 select-none">Connect Anytime, Anywhere</h2>
                <div className='flex justify-center items-center gap-4  '>
                  <div className="auth-badge select-none">Fast</div>
                  <div className="auth-badge select-none">Secure</div>
                  <div className="auth-badge select-none">Reliable</div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
    </div>
  )
}

export default LoginPage
