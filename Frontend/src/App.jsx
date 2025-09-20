import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

// Import all page components
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import OnboardPage from './pages/OnboardPage'
import ChatListPage from './pages/ChatListPage'
import ChatWindowPage from './pages/ChatWindowPage'
import CallLobbyPage from './pages/CallLobbyPage'
import VideoCallPage from './pages/VideoCallPage'
import ScreenSharePage from './pages/ScreenSharePage'
import ProfileSettingsPage from './pages/ProfileSettingsPage'

function App() {
  const [user, setUser] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboard" element={<OnboardPage />} />
          <Route path="/chat-list" element={<ChatListPage user={user} setUser={setUser} />} />
          <Route path="/chat/:roomId" element={<ChatWindowPage user={user} />} />
          <Route path="/call-lobby" element={<CallLobbyPage user={user} />} />
          <Route path="/video-call/:roomId" element={<VideoCallPage user={user} />} />
          <Route path="/screen-share/:roomId" element={<ScreenSharePage user={user} />} />
          <Route path="/profile" element={<ProfileSettingsPage user={user} setUser={setUser} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
