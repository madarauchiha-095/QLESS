# AI-Powered Hospital Token Queue Management System

A complete production-ready full-stack application for managing hospital queues with AI voice integration, real-time updates, and intelligent priority handling.

## 🚀 Features

- **AI Voice Integration**: Simulated webhook endpoint for voice-activated token booking
- **Real-Time Updates**: Socket.io powered live queue synchronization
- **Emergency Priority**: Automatic prioritization of emergency cases
- **Smart Queue Management**: Intelligent token ordering with estimated wait times
- **SMS Notifications**: Abstracted SMS service ready for Twilio/Exotel integration
- **Modern UI**: Beautiful, responsive dashboard with Framer Motion animations
- **Production Ready**: Clean architecture, error handling, and scalable structure

## 📋 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router
- Socket.io Client
- Lucide Icons

### Backend
- Node.js & Express
- PostgreSQL
- Sequelize ORM
- Socket.io
- dotenv
- CORS
- Morgan

## 🏗️ Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── services/       # API & Socket services
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── models/            # Sequelize models
│   ├── controllers/       # Route controllers
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── sockets/           # Socket.io setup
│   └── server.js          # Entry point
│
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE hospital_queue;
   ```

4. **Configure environment variables**
   
   Copy `.env` file and update with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=hospital_queue
   DB_USER=postgres
   DB_PASSWORD=your_password
   
   PORT=5000
   NODE_ENV=development
   
   CLIENT_URL=http://localhost:5173
   
   ADMIN_EMAIL=admin@hospital.com
   ADMIN_PASSWORD=admin123
   ```

5. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   The server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## 📡 API Endpoints

### Token Management

- `POST /api/tokens` - Create a new token
  ```json
  {
    "phone_number": "+91XXXXXXXXXX",
    "priority": 2
  }
  ```

- `POST /api/tokens/emergency` - Create emergency token
  ```json
  {
    "phone_number": "+91XXXXXXXXXX"
  }
  ```

- `POST /api/tokens/next` - Call next token from queue

- `POST /api/tokens/complete` - Complete current token

- `GET /api/tokens/status` - Get current queue state

### AI Voice Webhook

- `POST /api/voice/incoming` - Simulate AI voice call
  ```json
  {
    "phone_number": "+91XXXXXXXXXX",
    "intent": "book_token" | "emergency"
  }
  ```

### Health Check

- `GET /api/health` - Server health status

## 🔐 Authentication

The system uses basic authentication for the admin dashboard:

- **Email**: `admin@hospital.com`
- **Password**: `admin123`

(For production, implement proper authentication with JWT tokens)

## 🎯 Queue Logic

### Token Ordering
Tokens are ordered by:
1. **Priority** (ASC): Emergency (1) comes before Normal (2)
2. **Created At** (ASC): FIFO for same priority

### Estimated Wait Time
```
estimated_time = current_time + (queue_position × 10 minutes)
```

## 🔄 Real-Time Updates

The system uses Socket.io for real-time queue updates:

- **Event**: `queueUpdated`
- **Payload**: Complete queue state object

Frontend automatically updates when:
- New token is created
- Token is called
- Token is completed
- Emergency token is added

## 📱 SMS Service

The SMS service is abstracted and currently logs messages. To integrate with Twilio or Exotel:

1. Update `server/services/smsService.js`
2. Add your API credentials to `.env`
3. Uncomment and configure the Twilio/Exotel code

## 🐳 Docker Support

### Backend Dockerfile

A Dockerfile is included for containerized deployment:

```bash
cd server
docker build -t hospital-queue-server .
docker run -p 5000:5000 --env-file .env hospital-queue-server
```

## 🧪 Testing the System

### 1. Create a Token via API
```bash
curl -X POST http://localhost:5000/api/tokens \
  -H "Content-Type: application/json" \
  -d '{"phone_number": "+911234567890", "priority": 2}'
```

### 2. Simulate AI Voice Call
```bash
curl -X POST http://localhost:5000/api/voice/incoming \
  -H "Content-Type: application/json" \
  -d '{"phone_number": "+911234567890", "intent": "book_token"}'
```

### 3. Check Queue Status
```bash
curl http://localhost:5000/api/tokens/status
```

## 🚨 Error Handling

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 📝 Environment Variables

### Backend (.env)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `PORT` - Server port
- `NODE_ENV` - Environment (development/production)
- `CLIENT_URL` - Frontend URL for CORS
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password

## 🔧 Development

### Backend Development
```bash
cd server
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd client
npm run dev  # Vite dev server with HMR
```

## 📦 Production Build

### Frontend
```bash
cd client
npm run build
# Output in client/dist
```

### Backend
```bash
cd server
NODE_ENV=production npm start
```

## 🎨 UI Features

- **Landing Page**: Modern hero section with animated particles
- **Dashboard**: Real-time queue visualization
- **Glassmorphism**: Modern glass-effect UI elements
- **Responsive Design**: Works on all screen sizes
- **Dark Theme**: Easy on the eyes for long sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues or questions:
- Check the API documentation above
- Review server logs for errors
- Ensure PostgreSQL is running
- Verify environment variables are set correctly

## 🎉 Next Steps

- [ ] Add JWT authentication
- [ ] Integrate Twilio/Exotel for SMS
- [ ] Add database migrations
- [ ] Implement user roles and permissions
- [ ] Add analytics and reporting
- [ ] Set up CI/CD pipeline
- [ ] Add unit and integration tests

---

Built with ❤️ for modern healthcare facilities
