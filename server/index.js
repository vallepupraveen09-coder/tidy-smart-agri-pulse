import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import priceRoutes from './routes/price.js'
import diseaseRoutes from './routes/disease.js'
import guideRoutes from './routes/guide.js'
import pestRoutes from './routes/pesticide.js'
import voiceRoutes from './routes/voice.js'
import storeRoutes from './routes/store.js'
import weatherRoutes from './routes/weather.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agriia')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/price-predict', priceRoutes)
app.use('/api/disease-detect', diseaseRoutes)
app.use('/api/crop-guide', guideRoutes)
app.use('/api/pesticide-advice', pestRoutes)
app.use('/api/voice-assist', voiceRoutes)
app.use('/api/store-finder', storeRoutes)
app.use('/api/weather', weatherRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AgriAI API is running' })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error Handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`AgriAI Server running on port ${PORT}`)
})
