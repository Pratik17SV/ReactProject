import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/userLogin";
import { Video } from "lucide-react"; // Use an icon for the logo

// Import assets to match the signup page
import signupIllustration from '../assets/signup.png';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  // Standardized change handler to match signup page
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen bg-base-200 flex items-center justify-center p-4"
      data-theme="winter"
    >
      <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-5xl">
        {/* LOGIN FORM SECTION */}
        <div className="card-body lg:w-1/2">
          {/* LOGO - updated to use a styled icon component */}
          <div className="flex items-center gap-3 mb-4">
            <div className='flex items-center justify-center bg-primary rounded-lg p-2'>
              <Video className='size-7 text-primary-content' />
            </div>
            <h1 className="text-3xl font-bold">IntraMeet</h1>
          </div>

          {/* TEXT - updated for consistency */}
          <h2 className="card-title text-2xl">Welcome Back!</h2>
          <p className="text-base-content/70">Sign in to continue to IntraMeet.</p>
          
          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error.response?.data?.message || 'Login failed. Please check credentials.'}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            {/* INPUTS - updated to use standardized handler */}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                placeholder="Email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </label>

            <div className="card-actions">
              <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>

        {/* IMAGE SECTION - updated to match signup page */}
        <div className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 bg-primary/5 p-8">
          <img src={signupIllustration} alt="Video call illustration" className="w-full max-w-sm" />
          <div className="text-center space-y-2 mt-6 max-w-sm">
            <h2 className="text-xl font-semibold text-primary">Connect, Collaborate, Create</h2>
            <p className="text-base-content/70">
              Your seamless solution for team meetings and real-time communication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
