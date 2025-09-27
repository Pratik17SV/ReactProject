import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Send, 
  Video, 
  Monitor, 
  MoreVertical, 
  ArrowLeft,
  Phone,
  Users,
  Settings
} from 'lucide-react'
import '../styleing/ChatWindowPage.css'

function ChatWindowPage({ user }) {
  const { roomId } = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hey everyone! How is the project going?',
      sender: 'Alice Johnson',
      timestamp: '2:30 PM',
      isOwn: false,
      avatar: '👩'
    },
    {
      id: 2,
      text: 'Great! We just finished the authentication module.',
      sender: 'Bob Smith',
      timestamp: '2:32 PM',
      isOwn: false,
      avatar: '👨'
    },
    {
      id: 3,
      text: 'That\'s awesome! I\'m working on the UI components now.',
      sender: user?.name || 'You',
      timestamp: '2:35 PM',
      isOwn: true,
      avatar: '👤'
    },
    {
      id: 4,
      text: 'Perfect! The design looks really clean.',
      sender: 'Alice Johnson',
      timestamp: '2:36 PM',
      isOwn: false,
      avatar: '👩'
    }
  ])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: user?.name || 'You',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        avatar: '👤'
      }
      setMessages([...messages, newMessage])
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  return (
    <div className="chat-window-page">
      <div className="chat-header">
        <div className="chat-header-left">
          <Link to="/chat-list" className="back-button">
            <ArrowLeft size={20} />
          </Link>
          <div className="room-info">
            <h2>General Discussion</h2>
            <span className="room-status">5 members online</span>
          </div>
        </div>
        <div className="chat-header-right">
          <button className="header-action" title="Video Call">
            <Video size={20} />
          </button>
          <button className="header-action" title="Screen Share">
            <Monitor size={20} />
          </button>
          <button className="header-action" title="Call">
            <Phone size={20} />
          </button>
          <button className="header-action" title="Participants">
            <Users size={20} />
          </button>
          <button className="header-action" title="Settings">
            <Settings size={20} />
          </button>
          <button className="header-action" title="More">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="chat-messages">
        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.isOwn ? 'own' : 'other'}`}>
              {!msg.isOwn && (
                <div className="message-avatar">
                  <span className="avatar-emoji">{msg.avatar}</span>
                </div>
              )}
              <div className="message-content">
                {!msg.isOwn && (
                  <div className="message-sender">{msg.sender}</div>
                )}
                <div className="message-bubble">
                  <p className="message-text">{msg.text}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-container">
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <div className="input-wrapper">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="message-input"
              rows="1"
            />
            <button 
              type="submit" 
              className="send-button"
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatWindowPage
