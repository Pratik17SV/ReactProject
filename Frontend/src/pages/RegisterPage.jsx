import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Camera, Upload } from 'lucide-react'
import './RegisterPage.css'

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatar, setAvatar] = useState(null)

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
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Handle registration logic here
    console.log('Registration attempt:', formData, avatar)
    // For demo purposes, create a mock user
    const mockUser = {
      name: formData.name,
      email: formData.email,
      avatar: avatar ? URL.createObjectURL(avatar) : null
    }
    // Store user in localStorage for demo
    localStorage.setItem('user', JSON.stringify(mockUser))
    // Redirect to chat list after successful registration
    window.location.href = '/chat-list'
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <div className="logo">
            <div className="logo-icon">💬</div>
            <h1>ChatApp</h1>
          </div>
          <p className="register-subtitle">Create your account to get started.</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="avatar-section">
            <div className="avatar-upload">
              <div className="avatar-circle">
                {avatar ? (
                  <img 
                    src={URL.createObjectURL(avatar)} 
                    alt="Avatar preview" 
                    className="avatar-preview"
                  />
                ) : (
                  <Camera className="camera-icon" />
                )}
              </div>
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

          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/" className="login-link">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
