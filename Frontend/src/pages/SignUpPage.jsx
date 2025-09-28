import React from 'react';
import '../styling/signup.css'; 
import { useState } from 'react';
import navIcon from '../assets/nav_icon.png'; 
import signupIllustration from '../assets/signup.png';

// You can use an SVG icon directly in your component
//../assets/nav_icon.png
const VideoIcon = () => (
  <img src={navIcon} alt="IntraMeet Logo" className="logo-image" width="28" height="28"/>
);

const SignUpPage = () => {
  const [signupdata,setSignupdata]= useState({
    name:"",
    email:"",
    password:""
  });
  const handleSignup = (e) => {
    e.preventDefault();
    alert("Sign Up form submitted!");
  };

  return (
    <div className="signup-page-container">
      <div className="signup-card">

        {/* ================================== */}
        {/* ==      SIGNUP FORM - LEFT      == */}
        {/* ================================== */}
        <div className="signup-form-section">
          <div className="logo-container">
            <div className="logo-icon-wrapper">
              <VideoIcon />
            </div>
            <span className="logo-text">IntraMeet</span>
          </div>

          <div className="form-header">
            <h2>Create an Account</h2>
            <p>Join IntraMeet and connect with your team.</p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="john.doe@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" required />
              <p className="password-hint">Password must be at least 6 characters long.</p>
            </div>

            <div className="form-group-checkbox">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#terms">terms of service</a> and <a href="#privacy">privacy policy</a>.
              </label>
            </div>

            <button type="submit" className="btn btn-primary">Create Account</button>
          </form>

          <p className="signin-link">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>

        {/* Right Section */}
        <div className="signup-illustration-section">
          <div className="illustration-content">
            <img src={signupIllustration} alt="Video call illustration" />
            <h2>Connect, Collaborate, Create</h2>
            <p>Your seamless solution for team meetings and real-time communication.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;