import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  MessageCircle, 
  Plus, 
  LogOut, 
  Search, 
  MoreVertical,
  Video,
  Phone,
  Settings
} from 'lucide-react'
import './ChatListPage.css'

function ChatListPage({ user, setUser }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChat, setSelectedChat] = useState(null)

  // If no user, redirect to login
  if (!user) {
    window.location.href = '/login'
    return null
  }

  // Mock data for chats
  const [chats] = useState([
    {
      id: 1,
      name: 'General Discussion',
      lastMessage: 'Hey everyone! How is the project going?',
      timestamp: '2 min ago',
      unreadCount: 3,
      avatar: '👥',
      isOnline: true
    },
    {
      id: 2,
      name: 'Design Team',
      lastMessage: 'The new mockups look amazing!',
      timestamp: '1 hour ago',
      unreadCount: 0,
      avatar: '🎨',
      isOnline: true
    },
    {
      id: 3,
      name: 'Development',
      lastMessage: 'Bug fixed in the authentication module',
      timestamp: '3 hours ago',
      unreadCount: 1,
      avatar: '💻',
      isOnline: false
    },
    {
      id: 4,
      name: 'Marketing',
      lastMessage: 'Campaign launch scheduled for next week',
      timestamp: '1 day ago',
      unreadCount: 0,
      avatar: '📢',
      isOnline: true
    }
  ])

  const handleLogout = () => {
    setUser(null)
    window.location.href = '/'
  }

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="chat-list-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" />
              ) : (
                <div className="avatar-placeholder">👤</div>
              )}
            </div>
            <div className="user-info">
              <h3>{user?.name || 'John Doe'}</h3>
              <span className="status online">Online</span>
            </div>
          </div>
          <div className="sidebar-actions">
            <button className="action-btn" title="Settings">
              <Settings size={20} />
            </button>
            <button className="action-btn" onClick={handleLogout} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="search-section">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="chats-section">
          <div className="section-header">
            <h4>Conversations</h4>
            <button className="create-room-btn">
              <Plus size={16} />
              Create Room
            </button>
          </div>

          <div className="chats-list">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                className={`chat-item ${selectedChat === chat.id ? 'selected' : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="chat-avatar">
                  <span className="avatar-emoji">{chat.avatar}</span>
                  <div className={`online-indicator ${chat.isOnline ? 'online' : 'offline'}`}></div>
                </div>
                <div className="chat-content">
                  <div className="chat-header">
                    <h5 className="chat-name">{chat.name}</h5>
                    <span className="chat-timestamp">{chat.timestamp}</span>
                  </div>
                  <div className="chat-preview">
                    <p className="last-message">{chat.lastMessage}</p>
                    {chat.unreadCount > 0 && (
                      <span className="unread-badge">{chat.unreadCount}</span>
                    )}
                  </div>
                </div>
                <button className="chat-actions">
                  <MoreVertical size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="welcome-section">
          <div className="welcome-icon">
            <MessageCircle size={64} />
          </div>
          <h2>Welcome to ChatApp</h2>
          <p>Select a conversation to start chatting, or create a new room to get started.</p>
          <div className="welcome-actions">
            <Link to="/call-lobby" className="action-button primary">
              <Video size={20} />
              Start Video Call
            </Link>
            <button className="action-button secondary">
              <Plus size={20} />
              Create New Room
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatListPage
