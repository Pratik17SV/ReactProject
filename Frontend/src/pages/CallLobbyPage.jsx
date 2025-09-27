import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Video, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  ArrowLeft,
  Users,
  Settings
} from 'lucide-react'
import '../styleing/CallLobbyPage.css'

function CallLobbyPage({ user }) {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState('')
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [participants] = useState([
    { id: 1, name: 'Alice Johnson', avatar: '👩', isOnline: true },
    { id: 2, name: 'Bob Smith', avatar: '👨', isOnline: true },
    { id: 3, name: 'Carol Davis', avatar: '👩', isOnline: false },
    { id: 4, name: 'David Wilson', avatar: '👨', isOnline: true }
  ])

  const handleJoinCall = () => {
    if (roomId.trim()) {
      navigate(`/video-call/${roomId}`)
    } else {
      alert('Please enter a Room ID')
    }
  }

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substr(2, 9).toUpperCase()
    setRoomId(newRoomId)
  }

  return (
    <div className="call-lobby-page">
      <div className="lobby-container">
        <div className="lobby-header">
          <Link to="/chat-list" className="back-button">
            <ArrowLeft size={20} />
          </Link>
          <h1>Join Video Call</h1>
          <div className="header-actions">
            <button className="action-btn" title="Settings">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="lobby-content">
          <div className="room-section">
            <h2>Enter Room ID</h2>
            <div className="room-input-container">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                placeholder="Enter Room ID"
                className="room-input"
              />
              <button onClick={handleCreateRoom} className="create-room-btn">
                Generate
              </button>
            </div>
            <p className="room-help">
              Ask the host for the Room ID or create a new room
            </p>
          </div>

          <div className="device-controls">
            <h3>Device Settings</h3>
            <div className="controls-grid">
              <div className="control-item">
                <div className="control-icon">
                  {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
                </div>
                <div className="control-info">
                  <span className="control-label">Microphone</span>
                  <span className="control-status">
                    {isMicOn ? 'On' : 'Off'}
                  </span>
                </div>
                <button
                  className={`control-toggle ${isMicOn ? 'active' : ''}`}
                  onClick={() => setIsMicOn(!isMicOn)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>

              <div className="control-item">
                <div className="control-icon">
                  {isCameraOn ? <Camera size={24} /> : <CameraOff size={24} />}
                </div>
                <div className="control-info">
                  <span className="control-label">Camera</span>
                  <span className="control-status">
                    {isCameraOn ? 'On' : 'Off'}
                  </span>
                </div>
                <button
                  className={`control-toggle ${isCameraOn ? 'active' : ''}`}
                  onClick={() => setIsCameraOn(!isCameraOn)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="participants-section">
            <h3>Participants ({participants.filter(p => p.isOnline).length} online)</h3>
            <div className="participants-list">
              {participants.map(participant => (
                <div key={participant.id} className="participant-item">
                  <div className="participant-avatar">
                    <span className="avatar-emoji">{participant.avatar}</span>
                    <div className={`online-indicator ${participant.isOnline ? 'online' : 'offline'}`}></div>
                  </div>
                  <div className="participant-info">
                    <span className="participant-name">{participant.name}</span>
                    <span className="participant-status">
                      {participant.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="join-section">
            <button 
              className="join-call-btn"
              onClick={handleJoinCall}
              disabled={!roomId.trim()}
            >
              <Video size={20} />
              Join Call
            </button>
            <p className="join-help">
              Make sure your camera and microphone are working before joining
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CallLobbyPage
