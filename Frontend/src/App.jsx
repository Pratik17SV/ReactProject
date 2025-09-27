import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Notification from './pages/NotificationPage.jsx';
import Onboarding from './pages/OnbordingPage.jsx';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='h-screen' data-theme="light">
      <button onClick={() => toast.success('Hello World')}>Show Toast</button>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/call" element={<CallPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/onbording" element={<Onboarding/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
