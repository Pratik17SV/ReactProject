import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Phone, 
  MoreVertical,
  Users,
  Settings,
  Maximize2
} from 'lucide-react'
import '../styleing/VideoCallPage.css'

function VideoCallPage({ user }) {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [activeSpeaker, setActiveSpeaker] = useState(1)
  const [showParticipants, setShowParticipants] = useState(false)
  
  const [participants] = useState([
    { id: 1, name: 'Alice Johnson', avatar: '👩', isSpeaking: true, isMuted: false },
    { id: 2, name: 'Bob Smith', avatar: '👨', isSpeaking: false, isMuted: true },
    { id: 3, name: 'Carol Davis', avatar: '�', isSpeaking: false, isMuted: false },
    { id: 4, name: 'David Wilson', avatar: '👨', isSpeaking: false, isMuted: false },
    { id: 5, name: user?.name || 'You', avatar: '👤', isSpeaking: false, isMuted: !isMicOn }
  ])

  const videoRef = useRef(null)

  useEffect(() => {
    // Simulate active speaker changes
    const interval = setInterval(() => {
      setActiveSpeaker(prev => (prev % participants.length) + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [participants.length])

  const handleEndCall = () => {
    navigate('/chat-list')
  }

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    if (!isScreenSharing) {
      navigate(`/screen-share/${roomId}`)
    }
  }

  const toggleMic = () => {
    setIsMicOn(!isMicOn)
  }

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn)
  }

  return (
    <div className="video-call-page">
      <div className="call-container">
        <div className="video-grid">
          {participants.map((participant, index) => (
            <div 
              key={participant.id}
              className={`video-tile ${activeSpeaker === participant.id ? 'active-speaker' : ''} ${index === 0 ? 'main-video' : ''}`}
            >
              <div className="video-placeholder">
                {isCameraOn || participant.id === 5 ? (
                  <div className="video-content">
                    <div className="video-avatar">
                      <span className="avatar-emoji">{participant.avatar}</span>
                    </div>
                    <div className="video-overlay">
                      <div className="participant-info">
                        <span className="participant-name">{participant.name}</span>
                        {participant.isMuted && (
                          <div className="muted-indicator">
                            <MicOff size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                    {participant.isSpeaking && (
                      <div className="speaking-indicator"></div>
                    )}
                  </div>
                ) : (
                  <div className="camera-off">
                    <VideoOff size={32} />
                    <span>Camera Off</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="call-controls">
          <div className="control-buttons">
            <button 
              className={`control-btn ${!isMicOn ? 'muted' : ''}`}
              onClick={toggleMic}
              title={isMicOn ? 'Mute' : 'Unmute'}
            >
              {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button 
              className={`control-btn ${!isCameraOn ? 'disabled' : ''}`}
              onClick={toggleCamera}
              title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
            >
              {isCameraOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            <button 
              className={`control-btn ${isScreenSharing ? 'active' : ''}`}
              onClick={handleScreenShare}
              title="Share screen"
            >
              <Monitor size={20} />
            </button>

            <button 
              className="control-btn"
              onClick={() => setShowParticipants(!showParticipants)}
              title="Participants"
            >
              <Users size={20} />
            </button>

            <button className="control-btn" title="More options">
              <MoreVertical size={20} />
            </button>

            <button className="control-btn" title="Settings">
              <Settings size={20} />
            </button>
          </div>

          <button className="end-call-btn" onClick={handleEndCall} title="End call">
            <Phone size={20} />
          </button>
        </div>

        {showParticipants && (
          <div className="participants-panel">
            <div className="panel-header">
              <h3>Participants ({participants.length})</h3>
              <button 
                className="close-panel"
                onClick={() => setShowParticipants(false)}
              >
                ×
              </button>
            </div>
            <div className="participants-list">
              {participants.map(participant => (
                <div key={participant.id} className="participant-item">
                  <div className="participant-avatar">
                    <span className="avatar-emoji">{participant.avatar}</span>
                  </div>
                  <div className="participant-info">
                    <span className="participant-name">{participant.name}</span>
                    <div className="participant-status">
                      {participant.isMuted && <MicOff size={14} />}
                      {participant.isSpeaking && <span className="speaking">Speaking</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoCallPage
