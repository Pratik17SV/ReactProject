import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Monitor, 
  Video, 
  MessageCircle, 
  X,
  Mic,
  MicOff,
  Phone,
  Users,
  Maximize2,
  Minimize2
} from 'lucide-react'
import './ScreenSharePage.css'

function ScreenSharePage({ user }) {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [isMicOn, setIsMicOn] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages] = useState([
    { id: 1, text: 'Great presentation!', sender: 'Alice', timestamp: '2:30 PM' },
    { id: 2, text: 'Can you zoom in on that chart?', sender: 'Bob', timestamp: '2:31 PM' },
    { id: 3, text: 'Sure, let me do that', sender: user?.name || 'You', timestamp: '2:32 PM' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const [participants] = useState([
    { id: 1, name: 'Alice Johnson', avatar: '👩', isSpeaking: false },
    { id: 2, name: 'Bob Smith', avatar: '👨', isSpeaking: true },
    { id: 3, name: 'Carol Davis', avatar: '👩', isSpeaking: false },
    { id: 4, name: 'David Wilson', avatar: '👨', isSpeaking: false }
  ])

  const handleStopScreenShare = () => {
    navigate(`/video-call/${roomId}`)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Handle sending message
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className={`screen-share-page ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="screen-share-container">
        <div className="main-screen">
          <div className="screen-header">
            <div className="screen-info">
              <Monitor size={20} />
              <span>Screen Sharing - {user?.name || 'You'}</span>
            </div>
            <div className="screen-controls">
              <button 
                className="control-btn"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button 
                className="control-btn stop-share"
                onClick={handleStopScreenShare}
                title="Stop sharing"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="shared-screen">
            <div className="screen-content">
              <div className="presentation-slide">
                <h2>Project Presentation</h2>
                <div className="slide-content">
                  <div className="chart-placeholder">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '45%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                  </div>
                  <div className="slide-text">
                    <h3>Q3 Performance Metrics</h3>
                    <ul>
                      <li>Revenue increased by 25%</li>
                      <li>User engagement up 40%</li>
                      <li>Customer satisfaction at 95%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-controls">
            <div className="participant-thumbnails">
              {participants.map(participant => (
                <div 
                  key={participant.id} 
                  className={`thumbnail ${participant.isSpeaking ? 'speaking' : ''}`}
                >
                  <div className="thumbnail-avatar">
                    <span className="avatar-emoji">{participant.avatar}</span>
                  </div>
                  <div className="thumbnail-name">{participant.name}</div>
                </div>
              ))}
            </div>

            <div className="control-buttons">
              <button 
                className={`control-btn ${!isMicOn ? 'muted' : ''}`}
                onClick={() => setIsMicOn(!isMicOn)}
                title={isMicOn ? 'Mute' : 'Unmute'}
              >
                {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
              </button>

              <button 
                className="control-btn"
                onClick={() => navigate(`/video-call/${roomId}`)}
                title="Switch to video"
              >
                <Video size={16} />
              </button>

              <button 
                className={`control-btn ${showChat ? 'active' : ''}`}
                onClick={() => setShowChat(!showChat)}
                title="Toggle chat"
              >
                <MessageCircle size={16} />
              </button>

              <button className="control-btn end-call" title="End call">
                <Phone size={16} />
              </button>
            </div>
          </div>
        </div>

        {showChat && (
          <div className="chat-panel">
            <div className="chat-header">
              <h3>Chat</h3>
              <button 
                className="close-chat"
                onClick={() => setShowChat(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="chat-messages">
              {messages.map(message => (
                <div key={message.id} className="chat-message">
                  <div className="message-sender">{message.sender}</div>
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">{message.timestamp}</div>
                </div>
              ))}
            </div>

            <form className="chat-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button type="submit" className="send-btn">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScreenSharePage
