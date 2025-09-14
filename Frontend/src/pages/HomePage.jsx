import { Link } from 'react-router-dom'
import { 
  MessageCircle, 
  Video, 
  Users, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Play,
  LogOut,
  User
} from 'lucide-react'
import './HomePage.css'

function HomePage({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }
  return (
    <div className="home-page">
      {/* Navigation Header */}
      <nav className="nav-header">
        <div className="nav-container">
          <div className="nav-brand">
            <MessageCircle size={24} />
            <span>ChatApp</span>
          </div>
          <div className="nav-actions">
            {user ? (
              <div className="user-menu">
                <Link to="/chat-list" className="nav-link">
                  <User size={20} />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="nav-link logout">
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="nav-link">Sign In</Link>
                <Link to="/register" className="nav-button">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Connect, Chat, and Collaborate
              <span className="gradient-text"> Seamlessly</span>
            </h1>
            <p className="hero-description">
              Experience the future of team communication with our all-in-one platform. 
              Video calls, instant messaging, screen sharing, and more - all in one place.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="cta-button primary">
                <Play size={20} />
                Get Started Free
              </Link>
              <Link to="/login" className="cta-button secondary">
                Sign In
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Messages Daily</span>
              </div>
              <div className="stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="mockup-title">ChatApp</div>
                </div>
                <div className="mockup-content">
                  <div className="mockup-message received">
                    <div className="message-avatar">👋</div>
                    <div className="message-bubble">
                      <p>Hey! Ready for our meeting?</p>
                      <span className="message-time">2:30 PM</span>
                    </div>
                  </div>
                  <div className="mockup-message sent">
                    <div className="message-bubble">
                      <p>Absolutely! Starting the call now</p>
                      <span className="message-time">2:31 PM</span>
                    </div>
                    <div className="message-avatar">👤</div>
                  </div>
                  <div className="mockup-typing">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>Everything you need to stay connected</h2>
            <p>Powerful features designed for modern teams</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Video size={32} />
              </div>
              <h3>HD Video Calls</h3>
              <p>Crystal clear video calls with up to 50 participants. Share your screen, collaborate in real-time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <MessageCircle size={32} />
              </div>
              <h3>Instant Messaging</h3>
              <p>Send messages, files, and emojis instantly. Organize conversations in channels and direct messages.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users size={32} />
              </div>
              <h3>Team Collaboration</h3>
              <p>Create teams, manage permissions, and keep everyone in the loop with smart notifications.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Secure & Private</h3>
              <p>End-to-end encryption keeps your conversations private. Enterprise-grade security for peace of mind.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3>Lightning Fast</h3>
              <p>Optimized for speed and reliability. Low latency connections ensure smooth communication.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Globe size={32} />
              </div>
              <h3>Cross Platform</h3>
              <p>Works seamlessly across desktop, mobile, and web. Stay connected wherever you are.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to get started?</h2>
            <p>Join thousands of teams already using ChatApp to communicate better.</p>
            <div className="cta-actions">
              <Link to="/register" className="cta-button primary large">
                <Play size={24} />
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <MessageCircle size={24} />
                <span>ChatApp</span>
              </div>
              <p>Connecting teams worldwide</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#security">Security</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#help">Help Center</a>
                <a href="#docs">Documentation</a>
                <a href="#status">Status</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ChatApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
