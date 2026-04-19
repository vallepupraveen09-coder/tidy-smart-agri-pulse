# 🚀 HOW TO RUN - AgriAI Complete Guide

## Step-by-Step Instructions

### ✅ Prerequisites Check
Before starting, ensure you have:
- **Node.js v18+** - [Download here](https://nodejs.org/) (includes npm)
- **MongoDB** (Local or Cloud)
  - **Option A (Local)**: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
  - **Option B (Cloud)**: Free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Verify installation:
```bash
node --version    # Should show v18+
npm --version     # Should show 9+
```

---

## 🎯 FASTEST WAY TO RUN (3 Steps)

### Step 1: Setup Everything
Navigate to project folder and run setup:
```bash
cd "c:\Users\vanam\OneDrive\Desktop\agri-ai"
setup.bat
```
⏱️ This installs all dependencies (~3-5 minutes)

### Step 2: Start Backend & Frontend
```bash
start.bat
```
This automatically opens 2 terminal windows:
- **Terminal 1**: Backend server (Port 5000)
- **Terminal 2**: Frontend client (Port 5173)

### Step 3: Open in Browser
Navigate to: **http://localhost:5173**

Done! 🎉

---

## 📋 DETAILED MANUAL SETUP (If preferred)

### Step 1: Navigate to Project
```bash
cd "c:\Users\vanam\OneDrive\Desktop\agri-ai"
```

### Step 2: Install & Start Backend Server

**Terminal 1:**
```bash
cd server
npm install
```

Create `.env` file in `server/` folder:
```
MONGODB_URI=mongodb://localhost:27017/agriia
JWT_SECRET=your-super-secret-key
PORT=5000
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

Expected output:
```
✓ MongoDB connected
AgriAI Server running on port 5000
```

### Step 3: Install & Start Frontend Client

**Terminal 2 (new terminal):**
```bash
cd "c:\Users\vanam\OneDrive\Desktop\agri-ai\client"
npm install
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in 245 ms
  
  ➜  Local:   http://localhost:5173/
```

### Step 4: Access Application
Open browser → **http://localhost:5173/**

---

## 🌐 Using MongoDB

### Option A: MongoDB Local (Simple)
1. Download MongoDB Community from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. MongoDB automatically starts on `localhost:27017`
4. No configuration needed!

### Option B: MongoDB Atlas (Cloud - Recommended)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Add to `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agriia
   ```
5. Done!

---

## 🔑 Creating Test Accounts

After application opens:

### Test Account 1
- **Email**: farmer1@agriai.com
- **Password**: farmer123
- **Name**: Raj Kumar
- **Phone**: +91 9876543210

### Test Account 2
- **Email**: admin@agriai.com
- **Password**: admin123
- **Name**: Admin User
- **Phone**: +91 9876543211

Register these accounts first, then login!

---

## 📊 Testing Each Module

After login, test each module:

| Module | Test Input |
|--------|-----------|
| **Crop Price** | Select Rice → Maharashtra → Quantity 50 |
| **Disease** | Upload any crop image |
| **Crop Guide** | Select Rice → Get Guide |
| **Pesticide** | Select Cotton → Select Rust |
| **Voice** | Ask "What about water?" |
| **Store** | Enter "nashik" |
| **Weather** | Select Punjab → Get Weather |

---

## 🛠️ Troubleshooting

### Problem: "npm command not found"
**Solution**: Node.js not installed
- Download from [nodejs.org](https://nodejs.org/)
- Install with all default options
- Restart terminal and try again

### Problem: "MongoDB connection refused"
**Solution A (Local)**:
```bash
# Start MongoDB manually
mongod
```

**Solution B (Atlas)**:
- Verify connection string in `.env`
- Check network access in MongoDB Atlas UI
- Whitelist your IP address

### Problem: "Port 5000 already in use"
**Solution**: Change port in `server/index.js`:
```javascript
const PORT = process.env.PORT || 5001  // Change to 5001
```

Then update `client/vite.config.js`:
```javascript
'/api': {
  target: 'http://localhost:5001',  // Match server port
}
```

### Problem: "CORS error" in browser
**Causes**:
1. Backend server not running
2. Port mismatch between frontend & backend
3. Incorrect API URL

**Fix**: Ensure both servers running on correct ports (5000 & 5173)

### Problem: Frontend won't load styles
**Solution**:
```bash
cd client
npm install tailwindcss postcss autoprefixer
npm run dev
```

### Problem: Module not found errors
**Solution**:
```bash
# Clean install
rm -r node_modules
npm install
npm run dev
```

---

## 🎯 Project Structure Overview

```
agri-ai/
├── client/                    # React frontend (Port 5173)
│   ├── src/
│   │   ├── components/       # Navbar, Sidebar, Modules
│   │   ├── pages/            # Landing, Dashboard, Auth
│   │   ├── context/          # Auth & Language state
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Express backend (Port 5000)
│   ├── routes/               # API endpoints (7 modules)
│   ├── models/               # MongoDB schemas
│   ├── middleware/           # JWT auth
│   ├── index.js              # Entry point
│   ├── .env.example
│   └── package.json
│
├── setup.bat                  # Auto-installer
├── start.bat                  # Auto-starter
└── README.md
```

---

## 🚀 Running Commands Summary

```bash
# First time setup (one command)
setup.bat

# Start both servers (one command)
start.bat

# OR manual start:
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev

# Build for production:
cd client && npm run build
cd server && npm run build
```

---

## 📱 Application Flow

```
1. Browser: http://localhost:5173
   ↓
2. Landing Page (Register/Login)
   ↓
3. Create Account or Login
   ↓
4. Dashboard with 7 Modules
   ↓
5. Select Module → View Results
```

---

## 🌐 API Endpoints Cheat Sheet

```bash
# Authentication (No token needed for register)
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/auth/login

# All modules (Token required)
POST http://localhost:5000/api/price-predict
POST http://localhost:5000/api/disease-detect
GET  http://localhost:5000/api/crop-guide
POST http://localhost:5000/api/pesticide-advice
POST http://localhost:5000/api/voice-assist
GET  http://localhost:5000/api/store-finder
GET  http://localhost:5000/api/weather

# Health check
GET http://localhost:5000/api/health
```

---

## 🎨 Features Demo

### 🔐 Authentication
- Register with email & password
- Login with credentials
- Auto-login redirect to dashboard
- Logout anytime

### 🌍 Multi-Language
- **English, Hindi, Telugu, Tamil**
- Switch in navbar
- Preference saved in browser

### 💰 Crop Price Prediction
- Select crop (rice, wheat, cotton, etc.)
- View current & predicted prices
- See market trends

### 🦠 Disease Detection
- Upload crop image
- Get AI diagnosis
- View treatment & prevention

### 📚 Crop Growing Guide
- Select crop
- View complete farming schedule
- Sowing time, watering, fertilizer

### 🧪 Pesticide Advisor
- Select crop & disease
- Get recommended pesticide
- Dosage & application method

### 🎤 Voice Assistant
- Chat with AI
- Ask about farming
- Get intelligent responses

### 🏪 Store Finder
- Enter district name
- Find nearby stores
- Contact & hours

### ⛅ Weather Analysis
- Select state
- Current weather data
- Forecast & alerts

---

## ✨ Quick Checks

After starting, verify everything works:

✅ Backend console shows: `AgriAI Server running on port 5000`
✅ Frontend console shows: `http://localhost:5173/`
✅ Browser loads landing page without errors
✅ Can register new account
✅ Can login
✅ Dashboard loads all 7 modules
✅ Can select each module and get responses

---

## 📞 Need Help?

1. **Check console errors** (Browser F12 → Console)
2. **Check terminal errors** (Backend terminal output)
3. **Verify ports**: Backend 5000, Frontend 5173
4. **Restart both servers** (Stop with Ctrl+C, restart)
5. **Clear browser cache** (Ctrl+Shift+Delete)
6. **Check MongoDB is running**

---

## 🎯 Next Steps After Running

1. ✅ Register an account
2. ✅ Login to dashboard
3. ✅ Test all 7 modules
4. ✅ Try different languages
5. ✅ Explore API (Postman recommended)
6. ✅ Check localStorage for token
7. ✅ Try logout/login flow

---

## 🌟 Tips & Tricks

- **Fastest testing**: Use `setup.bat` + `start.bat`
- **Keep running**: Don't close terminal windows while testing
- **Port issues**: Use `netstat -ano` to find what's using ports
- **Clear errors**: `rm -r node_modules` and reinstall
- **Local vs Cloud**: Local MongoDB simpler for testing, Atlas better for production
- **Hot reload**: Both servers support hot reload (changes auto-refresh)

---

## 🎉 You're Ready!

Your AgriAI platform is now production-ready! 

**Happy farming with AI! 🌾**

For more details, see [README.md](./README.md)
