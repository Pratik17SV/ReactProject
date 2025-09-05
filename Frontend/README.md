# ChatApp - React Video Chat Application

A comprehensive video chat application built with React, featuring modern UI design and full functionality for team communication.

## Features

### 🔐 Authentication
- **Login Page**: Clean login interface with email/password authentication
- **Register Page**: User registration with avatar upload and password confirmation

### 💬 Chat System
- **Chat List**: Slack-like interface showing all conversations with latest messages
- **Chat Window**: Real-time messaging with message bubbles and timestamps
- **Room Management**: Create and join chat rooms

### 📹 Video Calling
- **Call Lobby**: Join calls with Room ID, device controls, and participant list
- **Video Call**: Grid-based video interface with active speaker highlighting
- **Screen Sharing**: Share your screen with presentation tools and chat panel

### ⚙️ Settings & Profile
- **Profile Management**: Update avatar, name, email, and password
- **Theme Toggle**: Switch between light and dark modes
- **Online Status**: Control your visibility to other users

## Pages Overview

1. **Login Page** (`/`) - User authentication
2. **Register Page** (`/register`) - New user registration
3. **Chat List** (`/chat-list`) - Main dashboard with conversation list
4. **Chat Window** (`/chat/:roomId`) - Individual chat interface
5. **Call Lobby** (`/call-lobby`) - Pre-call setup and device controls
6. **Video Call** (`/video-call/:roomId`) - Video calling interface
7. **Screen Share** (`/screen-share/:roomId`) - Screen sharing with chat
8. **Profile Settings** (`/profile`) - User profile and preferences

## Technology Stack

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Modern icon library
- **CSS3** - Styling with custom properties and animations
- **Vite** - Build tool and development server

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Design Features

### 🎨 Modern UI/UX
- Clean, professional design inspired by modern chat applications
- Responsive layout that works on desktop and mobile
- Smooth animations and transitions
- Consistent color scheme and typography

### 🌙 Dark Mode Support
- Toggle between light and dark themes
- Consistent theming across all components
- Smooth theme transitions

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## Component Structure

```
src/
├── pages/
│   ├── LoginPage.jsx & .css
│   ├── RegisterPage.jsx & .css
│   ├── ChatListPage.jsx & .css
│   ├── ChatWindowPage.jsx & .css
│   ├── CallLobbyPage.jsx & .css
│   ├── VideoCallPage.jsx & .css
│   ├── ScreenSharePage.jsx & .css
│   └── ProfileSettingsPage.jsx & .css
├── App.jsx
├── App.css
└── main.jsx
```

## Key Features Implemented

### Authentication Flow
- Form validation and error handling
- Password visibility toggles
- Avatar upload functionality
- Responsive form layouts

### Chat Interface
- Real-time message display
- Message bubbles with sender information
- Timestamp formatting
- Scroll-to-bottom functionality
- Message input with send button

### Video Calling
- Grid-based video layout
- Active speaker detection
- Device controls (mic/camera)
- Participant management
- Screen sharing capabilities

### Settings Management
- Profile information updates
- Password change functionality
- Theme switching
- Online status control
- Form validation and feedback

## Future Enhancements

- Real-time messaging with WebSocket integration
- Actual video calling with WebRTC
- File sharing capabilities
- Push notifications
- User presence indicators
- Message search functionality
- Group management features

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for educational purposes and demonstration of React development skills.