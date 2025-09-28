import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import signupIllustration from '../assets/signup.png';
import navIcon from '../assets/nav_icon.png'; 
import { useSignUp } from '../hooks/useSignUp'; 

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
 const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4" data-theme="winter">
      <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-5xl">
        <div className="card-body lg:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <img src={navIcon} alt="IntraMeet Logo" className="h-10 w-10" />
            <h1 className="text-3xl font-bold">IntraMeet</h1>
          </div>

          <h2 className="card-title text-2xl">Create an Account</h2>
          <p className="text-base-content/70">Join IntraMeet and connect with your team.</p>

          <form onSubmit={handleSignup} className="space-y-4 mt-4">

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                }
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                }
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                }
                required
              />
            </label>

            <p className="text-xs text-base-content/70 mt-1 pl-1">Password must be at least 6 characters long.</p>

            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" required />
                <span className="label-text">
                  I agree to the <Link to="/terms" className="link link-primary">terms of service</Link>
                </span>
              </label>
            </div>

            <div className="card-actions">
              <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                {isPending ? "Creating..." : "Create Account"}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">Signup failed. Check console.</p>}
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="link link-primary">Sign In</Link>
          </p>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 bg-primary/5 p-8">
          <img src={signupIllustration} alt="Video call illustration" className="w-full max-w-sm" />
          <div className="text-center space-y-2 mt-6 max-w-sm">
            <h2 className="text-xl font-semibold text-primary">Connect, Collaborate, Create</h2>
            <p className="text-base-content/70">Your seamless solution for team meetings and real-time communication.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
