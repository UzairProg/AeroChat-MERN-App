import React from "react";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import {
  MessageCircle,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { isSigningUp, userSignUp } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    userSignUp(formData);
  };

  return (
    <div className="absolute inset-0 w-full h-screen flex justify-center items-center p-6">
      {/* outer div w-f h-f to make items in center*/}
      <BorderAnimatedContainer className="overflow-hidden flex justify-center">
        <div /* actual signUp div */
          className="bg-slate-900/80 w-[90vw] backdrop-blur-sm max-w-4xl md:w-[70vw] px-5 py-2 lg:p-2 rounded-xl flex flex-col md:flex-row min-h-[70vh] md:min-h-[40vw]"
        >
          {/* left side */}
          <div className="w-full md:w-1/2 h-full md:border-r border-slate-700/40 flex flex-col p-6 md:p-12">
            <div className="flex flex-col mb-5 w-full items-center gap-3">
              <MessageCircle className="w-12 h-12 text-slate-400" />
              <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold text-2xl text-slate-200 select-none">
                  Create Account
                </h1>
                <h2 className="font-semibold text-center text-lg text-slate-400 select-none">
                  Sign up for a new account
                </h2>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* FULL NAME */}
              <div>
                <label className="auth-input-label">Full Name</label>
                <div className="relative">
                  <UserIcon className="auth-input-icon" />

                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* EMAIL INPUT */}
              <div>
                <label className="auth-input-label">Email</label>
                <div className="relative">
                  <MailIcon className="auth-input-icon" />

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="input"
                    placeholder="johndoe@gmail.com"
                  />
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div>
                <label className="auth-input-label">Password</label>
                <div className="relative">
                  <LockIcon className="auth-input-icon" />

                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="input"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button className="auth-btn" type="submit" disabled={isSigningUp}>
                {isSigningUp ? (
                  <LoaderIcon className="w-full h-5 animate-spin text-center" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="auth-link">
                Already have an account? Login
              </Link>
            </div>
          </div>
          {/* right side - decorative panel, hidden on small screens */}
          <div className="hidden md:flex md:w-1/2 h-full p-8 items-center justify-center flex-col">
            <div>
              <img src="./signup.png" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-blue-500/70 select-none">Start your journey with AeroChat</h2>
              <div className="flex justify-center items-center gap-3 mt-4">
                <div className="auth-badge select-none">Free</div>
                <div className="auth-badge select-none">Fast</div>
                <div className="auth-badge select-none">Private</div>
              </div>
            </div>
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default SignUpPage;
