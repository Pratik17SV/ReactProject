# IntraMeet — Video Call & Chat App

Unified README for the repository covering Frontend and Backend components.

## Project Overview
IntraMeet is a lightweight video call and chat application with:
- Real-time chat
- 1:1 / group video calling (WebRTC)
- Friend discovery / friend requests
- Basic authentication and profile management
- Notifications and presence (via WebSocket / Socket.IO)

This repo contains two main folders:
- `Frontend/` — React (Vite) application
- `Backend/` — API server (Node/Express or similar) and real-time signaling

> If your backend folder uses a different name (e.g. `Server/`), update the commands below accordingly.

---

## Quick Start (Windows)

1. Clone the repo
```powershell
git clone <repo-url>
cd "b:\Collage BCA\corsera\ReactProject"
```

2. Install dependencies

Frontend:
```powershell
cd Frontend
npm install
```

Backend:
```powershell
cd ..\Backend
npm install
```

3. Environment
- Create .env files in both `Frontend/` and `Backend/` (see `Environment` section).
- Start both services (run in separate terminals) or use a process manager:

Frontend:
```powershell
cd Frontend
npm run dev
# opens at http://localhost:5173 (or Vite assigned port)
```

Backend:
```powershell
cd Backend
npm run dev
# default API port: 4000 (or as configured)
```

Optional: run both concurrently (requires `concurrently` or a custom script).

---

## Frontend

Location: `Frontend/`

Tech:
- React (Vite)
- React Router
- @tanstack/react-query
- Tailwind / DaisyUI (utility classes seen in components)
- lucide-react icons

Environment variables (example `.env` / Vite):
- VITE_API_URL=http://localhost:4000/api
- VITE_SOCKET_URL=http://localhost:4000

Common scripts:
- `npm run dev` — start dev server
- `npm run build` — build production
- `npm run preview` — preview production build
- `npm run lint` — linting

Notes:
- Update `VITE_API_URL` to point to your backend API.
- Assets live under `Frontend/src/assets/` (e.g. `signup.png`, `nav_icon.png`).

---

## Backend

Location: `Backend/` (replace if different)

Suggested tech:
- Node.js + Express (or Fastify)
- MongoDB (Mongoose)
- JWT for auth
- Socket.IO for real-time (signaling, chat, presence)
- WebRTC for peer-to-peer media (signaling via Socket.IO)

Environment variables (example `.env`):
- PORT=4000
- MONGODB_URI=mongodb://localhost:27017/intrameet
- JWT_SECRET=your_jwt_secret
- CORS_ORIGIN=http://localhost:5173
- SOCKET_PATH=/socket.io

Common endpoints (implementations may vary):
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/friends         -> user's friends
- GET /api/users/recommended
- GET /api/friends/outgoing
- POST /api/friends/request -> send friend request (body: { recipientId })
- GET /api/notifications
- POST /api/calls/create or signaling routes for rooms

Real-time events (Socket.IO examples):
- connection, disconnect
- join-room, leave-room
- signal, offer, answer, ice-candidate
- chat:message
- friend:request, friend:accept

Database:
- Users collection (name, email, passwordHash, avatar, status)
- Friends / FriendRequests collection
- Messages (optional: per-room)
- Calls / Rooms (optional)

Start backend:
```powershell
cd Backend
npm run dev
```

---

## Development Tips

- Ensure frontend `VITE_API_URL` matches backend base path.
- Use browser devtools and server logs when debugging socket and WebRTC flows.
- For WebRTC testing across devices, use HTTPS (or localhost with proper flags).
- If friends list is empty, confirm backend `/friends` returns array or wrap response safely in frontend (see `HomePage.jsx`).

---

## Testing & Linting

- Run unit / integration tests if provided:
```powershell
npm test
```
- Lint:
```powershell
npm run lint
```

---

## Production Deployment

- Build frontend (`npm run build`) and serve via static host or behind Nginx.
- Run backend behind reverse proxy, ensure HTTPS and proper CORS and socket configuration.
- Use environment-specific variables for DB and secrets.

---

## Contributing

- Fork → branch → PR
- Keep changes small and focused
- Run linting and tests before opening PR

---

## Troubleshooting

- "No friends shown": verify backend returns friends array and frontend uses correct API URL. See `Frontend/src/pages/HomePage.jsx` — it normalizes API shapes.
- `useSignUp is not a function`: ensure hook export/import matches (default vs named).

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

done till : 1.26.42