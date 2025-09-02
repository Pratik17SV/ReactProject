# ReactProject
# IntraMeet 🎥💬

> **Chat, video calls, and screen sharing inside your private network or server.**  
> Built with **MERN + WebRTC + Socket.io**  
> A collaborative project by **Pratik & Sahil** 👨‍💻👨‍💻

---

## 🚀 Features
- 🔐 **User Authentication** (JWT-based login & registration)  
- 💬 **Real-time Chat** (one-to-one & group)  
- 📹 **Video Calls** (WebRTC peer-to-peer)  
- 🖥️ **Screen Sharing** (share your screen in meetings)  
- 🌐 **LAN Mode** — Works on **local Wi-Fi without internet**  
- ☁️ **Private Cloud Mode** — Deploy to your own cloud server  

---

## 🏗️ Tech Stack
- **Frontend:** React (with Tailwind / Material UI)  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **Real-time Communication:** Socket.io + WebRTC  
- **Authentication:** JWT + Bcrypt  

---

## 📂 Project Structure

---

## ⚙️ API Endpoints

### 🔑 Auth
- `POST /api/auth/register` → Register user  
- `POST /api/auth/login` → Login & get JWT  

### 👤 Users
- `GET /api/users/me` → Get user profile  
- `PATCH /api/users/me` → Update profile  

### 💬 Chat
- `POST /api/messages` → Send message  
- `GET /api/messages/:roomId` → Fetch messages  

### 📞 Rooms
- `POST /api/rooms` → Create chat/call room  
- `GET /api/rooms/:id` → Get room details  

---

## 🖼️ Wireframes
- **Login/Register** → Email, password, register  
- **Chat List** → List of rooms with recent message  
- **Chat Window** → Messages, call & share buttons  
- **Video Call** → Video grid, mute, camera toggle, screen share  
- **Screen Share** → Shared screen + participants view  

*(See `/docs/IntraMeet_Blueprint.pdf` for full wireframes & ER diagram)*

---

## 🖥️ Setup Instructions

### 🔹 Backend (server)
```bash
cd server
npm install
npm start

👨‍💻 Authors

Pratik

Sahil 

