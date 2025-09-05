import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Save, 
  Eye, 
  EyeOff,
  User,
  Mail,
  Lock,
  Moon,
  Sun,
  Wifi,
  WifiOff
} from 'lucide-react'
import './ProfileSettingsPage.css'

function ProfileSettingsPage({ user, setUser, isDarkMode, setIsDarkMode }) {
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [avatar, setAvatar] = useState(user?.avatar || null)
  const [isOnline, setIsOnline] = useState(true)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(URL.createObjectURL(file))
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update user data
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      avatar: avatar,
      isOnline: isOnline
    }
    setUser(updatedUser)
    
    setIsSaving(false)
    alert('Profile updated successfully!')
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="profile-settings-page">
      <div className="profile-container">
        <div className="profile-header">
          <Link to="/chat-list" className="back-button">
            <ArrowLeft size={20} />
          </Link>
          <h1>Profile & Settings</h1>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Profile Information</h2>
            
            <div className="avatar-section">
              <div className="avatar-container">
                <div className="avatar-circle">
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="avatar-image" />
                  ) : (
                    <User size={32} />
                  )}
                </div>
                <label htmlFor="avatar" className="avatar-upload-btn">
                  <Camera size={16} />
                  <Upload size={16} />
                </label>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="avatar-input"
                />
              </div>
              <p className="avatar-help">Click to upload a new profile picture</p>
            </div>

            <form className="profile-form" onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-container">
                  <User className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-container">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <div className="input-container">
                  <Lock className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="settings-section">
            <h2>Preferences</h2>
            
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon">
                    {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
                  </div>
                  <div className="setting-details">
                    <h3>Online Status</h3>
                    <p>Show as online to other users</p>
                  </div>
                </div>
                <button
                  className={`toggle-switch ${isOnline ? 'active' : ''}`}
                  onClick={() => setIsOnline(!isOnline)}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon">
                    {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                  </div>
                  <div className="setting-details">
                    <h3>Theme</h3>
                    <p>{isDarkMode ? 'Dark' : 'Light'} mode</p>
                  </div>
                </div>
                <button
                  className={`toggle-switch ${isDarkMode ? 'active' : ''}`}
                  onClick={toggleTheme}
                >
                  <div className="toggle-slider"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="actions-section">
            <button 
              className="save-button"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save size={20} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettingsPage
