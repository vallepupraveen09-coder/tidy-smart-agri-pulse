import express from 'express'
import { authenticate } from '../middleware/auth.js'
import CropQuery from '../models/CropQuery.js'

const router = express.Router()

const weatherDatabase = {
  'maharashtra': { temperature: 28, humidity: 65, rainfall: 120, windSpeed: 12, uvIndex: 7, season: 'Monsoon', alert: 'Heavy rain expected' },
  'punjab': { temperature: 32, humidity: 45, rainfall: 80, windSpeed: 15, uvIndex: 8, season: 'Summer', alert: 'Heat wave alert' },
  'haryana': { temperature: 35, humidity: 40, rainfall: 60, windSpeed: 10, uvIndex: 9, season: 'Summer', alert: 'Severe heat' },
  'uttar pradesh': { temperature: 30, humidity: 55, rainfall: 100, windSpeed: 8, uvIndex: 7, season: 'Monsoon', alert: 'Normal' },
  'karnataka': { temperature: 26, humidity: 70, rainfall: 150, windSpeed: 14, uvIndex: 6, season: 'Monsoon', alert: 'Flooding risk' }
}

router.get('/', authenticate, async (req, res) => {
  try {
    const { state } = req.query
    const weather = weatherDatabase[state?.toLowerCase()] || weatherDatabase.maharashtra

    await CropQuery.create({
      userId: req.user.id,
      moduleType: 'weather',
      query: state,
      result: weather
    })

    res.json(weather)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
