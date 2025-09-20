import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Camera, Upload, X, Check } from 'lucide-react'
import './OnboardPage.css'

function OnboardPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [showAvatarOptions, setShowAvatarOptions] = useState(false)

  // Predefined avatar options
  const avatarOptions = [
    '👤', '👨', '👩', '🧑', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓',
    '👨‍💻', '👩‍💻', '👨‍🔬', '👩‍🔬', '👨‍🎨', '👩‍🎨', '👨‍🚀', '👩‍🚀',
    '🧑‍💼', '🧑‍🎓', '🧑‍💻', '🧑‍🔬', '🧑‍🎨', '🧑‍🚀', '👨‍🍳', '👩‍🍳'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      setSelectedAvatar(null)
      setShowAvatarOptions(false)
    }
  }

  const handleAvatarSelect = (emoji) => {
    setSelectedAvatar(emoji)
    setAvatar(null)
    setShowAvatarOptions(false)
  }

  const removeAvatar = () => {
    setAvatar(null)
    setSelectedAvatar(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Handle registration logic here
    console.log('Onboarding attempt:', formData, avatar, selectedAvatar)
    // For demo purposes, create a mock user
    const mockUser = {
      name: formData.name,
      email: formData.email,
      avatar: avatar ? URL.createObjectURL(avatar) : selectedAvatar || '👤'
    }
    // Store user in localStorage for demo
    localStorage.setItem('user', JSON.stringify(mockUser))
    // Redirect to chat list after successful registration
    window.location.href = '/chat-list'
  }

  return (
    <div className="onboard-page">
      <div className="onboard-container">
        <div className="onboard-header">
          <div className="logo">
            <div className="logo-icon">💬</div>
            <h1>Intrameet</h1>
          </div>
          <p className="onboard-subtitle">Welcome! Let's set up your profile to get started.</p>
        </div>

        <form className="onboard-form" onSubmit={handleSubmit}>
          <div className="avatar-section">
            <div className="avatar-upload">
              <div className="avatar-circle">
                {avatar ? (
                  <div className="avatar-preview-container">
                    <img 
                      src={URL.createObjectURL(avatar)} 
                      alt="Avatar preview" 
                      className="avatar-preview"
                    />
                    <button 
                      type="button" 
                      className="remove-avatar"
                      onClick={removeAvatar}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : selectedAvatar ? (
                  <div className="avatar-emoji-container">
                    <span className="avatar-emoji">{selectedAvatar}</span>
                    <button 
                      type="button" 
                      className="remove-avatar"
                      onClick={removeAvatar}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <Camera className="camera-icon" />
                )}
              </div>
              
              <div className="avatar-options">
                <button 
                  type="button" 
                  className="avatar-option-btn"
                  onClick={() => setShowAvatarOptions(!showAvatarOptions)}
                >
                  <User size={16} />
                  Choose Avatar
                </button>
                
                <label htmlFor="avatar" className="avatar-upload-button">
                  <Upload size={16} />
                  Upload Photo
                </label>
                
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="avatar-input"
                />
              </div>

              {showAvatarOptions && (
                <div className="avatar-grid">
                  <div className="avatar-grid-header">
                    <h4>Choose an Avatar</h4>
                    <button 
                      type="button" 
                      className="close-avatar-grid"
                      onClick={() => setShowAvatarOptions(false)}
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="avatar-options-grid">
                    {avatarOptions.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`avatar-option ${selectedAvatar === emoji ? 'selected' : ''}`}
                        onClick={() => handleAvatarSelect(emoji)}
                      >
                        <span className="emoji">{emoji}</span>
                        {selectedAvatar === emoji && <Check className="check-icon" size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

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
                placeholder="Enter your full name"
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
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
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

          <button type="submit" className="onboard-button">
            Complete Setup
          </button>
        </form>

        <div className="onboard-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OnboardPage
