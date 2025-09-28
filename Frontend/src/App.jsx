import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Notification from './pages/NotificationPage.jsx';
import Onboarding from './pages/OnbordingPage.jsx';

import { toast, Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './lib/axios.js';

function App() {
  const { data:authdata, error, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    }
  });//check the authentication status

  const authUser = authdata?.user;
  if(isLoading) return <div>Loading...</div>
  console.log({isLoading});
  console.log({error});
  return (
    <div className='h-screen' data-theme="light">
      
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to='/'/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/'/>} />
        <Route path="/call" element={authUser ? <CallPage />: <Navigate to='/login'/>} />
        <Route path="/chat" element={authUser ? <ChatPage />: <Navigate to='/login'/>} />
        <Route path="/notification" element={authUser ? <Notification /> : <Navigate to='/login'/>} />
        <Route path="/onbording" element={authUser ? <Onboarding />: <Navigate to='/login'/>} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
