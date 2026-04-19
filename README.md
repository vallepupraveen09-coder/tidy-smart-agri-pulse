# AgriAI - AI-Powered Smart Farming Platform

A production-ready full-stack AI farming platform with 7 intelligent modules for crop price prediction, disease detection, crop guides, pesticide recommendations, voice assistance, store finding, and weather analysis.

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** v5+ (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** or **yarn**

### Installation & Setup

#### 1️⃣ Clone/Navigate to Project
```bash
cd "c:\Users\vanam\OneDrive\Desktop\agri-ai"
```

#### 2️⃣ Setup Backend Server
```bash
cd server
npm install
```

Create `.env` file from `.env.example`:
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your settings (optional for local development)
```

Start backend server:
```bash
npm run dev
```
✅ Backend runs on **http://localhost:5000**

#### 3️⃣ Setup Frontend Client (in new terminal)
```bash
cd client
npm install
npm run dev
```
✅ Frontend runs on **http://localhost:5173**

---

## 📱 Access the Application

1. **Open browser**: Navigate to `http://localhost:5173`
2. **Register** a new account with email and password
3. **Login** to access all 7 AI modules
4. **Start exploring** crop analytics!

---

## 🎯 Features Overview

### 7 AI-Powered Modules

| Module | Purpose | Tech |
|--------|---------|------|
| **Crop Price Prediction** | Real-time market prices & forecasts | ML + Real data |
| **Disease Detection** | AI image recognition for crop diseases | Computer Vision |
| **Crop Guide** | Complete farming guides & best practices | Knowledge DB |
| **Pesticide Advisor** | Smart pesticide recommendations | Expert system |
| **Voice Assistant** | AI-powered voice chat (4 languages) | NLP |
| **Store Finder** | Locate nearby agricultural stores | Geolocation |
| **Weather Analysis** | Hyperlocal weather predictions | Weather API |

---

## 🏗️ Project Structure

```
agri-ai/
├── client/                    # React 18 + Vite frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Auth & Language context
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                    # Node.js + Express backend
│   ├── routes/               # API routes (7 modules)
│   ├── models/               # MongoDB schemas
│   ├── middleware/           # Auth middleware
│   ├── index.js              # Server entry point
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/register          Create new user
POST   /api/auth/login             Login user
GET    /api/auth/profile           Get user profile
```

### Modules (All require JWT token)
```
POST   /api/price-predict          Get crop prices
POST   /api/disease-detect         Detect crop diseases
GET    /api/crop-guide             Get farming guide
POST   /api/pesticide-advice       Get pesticide recommendations
POST   /api/voice-assist           Voice AI chat
GET    /api/store-finder           Find stores
GET    /api/weather                Get weather data
```

---

## 📦 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **Recharts** - Data visualization
- **shadcn/ui** - UI components
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Multer** - File uploads
- **OpenAI API** - AI integration

---

## 🔐 Authentication Flow

1. **Register**: User creates account with email/password
2. **Login**: Credentials verified, JWT token issued
3. **Token Storage**: Stored in localStorage (client)
4. **Protected Routes**: All module endpoints require valid JWT
5. **Auto-logout**: Token expiration after 30 days

---

## 🌍 Multi-Language Support

Supported languages:
- 🇮🇳 **English** (en)
- 🇮🇳 **Hindi** (hi)
- 🇮🇳 **Telugu** (te)
- 🇮🇳 **Tamil** (ta)

Language preference is saved in localStorage and persists across sessions.

---

## 🚨 Troubleshooting

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### Port already in use
```bash
# Change port in:
# Backend: server/index.js (line: const PORT = ...)
# Frontend: client/vite.config.js (line: port: ...)
```

### MongoDB connection failed
```bash
# Ensure MongoDB is running:
# Local: mongod command
# Cloud: Add connection string to .env
```

### CORS errors
Check that both servers are running on correct ports and URLs match in client API calls.

---

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/agriia
JWT_SECRET=your-super-secret-key-change-in-production
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your-openai-api-key
```

### Frontend (Vite auto-detection)
API proxy configured to `http://localhost:5000` in `vite.config.js`

---

## 🎨 Styling

### Glassmorphism Design
- Semi-transparent backgrounds
- Backdrop blur effects
- Gradient overlays
- Responsive at all breakpoints

### Color Scheme
- **Primary**: #10b981 (Green)
- **Secondary**: #059669 (Emerald)
- **Accent**: #3b82f6 (Blue)
- **Dark**: Gradient backgrounds

---

## 📊 Mock Data

For development/testing, all modules use mock data:
- **Crop Prices**: Real-like market data
- **Disease Detection**: Common crop diseases
- **Crop Guides**: Full farming schedules
- **Weather**: State-wise data for all 36 Indian states + 8 UTs
- **Stores**: Sample locations (Nashik, Belgaum, Bengaluru)

---

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
# Set environment variables in hosting platform
# Deploy from GitHub
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/module-name`
2. Commit changes: `git commit -m "Add feature"`
3. Push to branch: `git push origin feature/module-name`
4. Open Pull Request

---

## 📄 License

© 2024 AgriAI. All rights reserved.

---

## 📞 Support

For issues or questions:
- Check [Troubleshooting](#-troubleshooting) section
- Review console errors
- Verify environment variables
- Check both servers are running

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Configure MongoDB
3. ✅ Set environment variables
4. ✅ Run backend & frontend
5. ✅ Register & login
6. ✅ Explore all 7 modules
7. ✅ Deploy to production

**Happy Farming with AI! 🌾**
