import express from 'express'
import { authenticate } from '../middleware/auth.js'
import CropQuery from '../models/CropQuery.js'

const router = express.Router()

// Mock price data
const priceDatabase = {
  rice: { current: 2100, forecast: 2200, trend: '+4.8%' },
  wheat: { current: 2500, forecast: 2600, trend: '+2.5%' },
  cotton: { current: 5800, forecast: 6000, trend: '+3.8%' },
  sugarcane: { current: 4200, forecast: 4400, trend: '+4.2%' },
  maize: { current: 1900, forecast: 1950, trend: '+1.5%' },
  groundnut: { current: 6500, forecast: 6700, trend: '+2.3%' }
}

router.post('/', authenticate, async (req, res) => {
  try {
    const { crop, state, quantity, unit } = req.body
    const priceData = priceDatabase[crop.toLowerCase()] || priceDatabase.rice

    const result = {
      crop,
      state,
      currentPrice: priceData.current,
      predictedPrice: priceData.forecast,
      trend: priceData.trend,
      estimatedIncome: (priceData.forecast * (quantity || 1)).toFixed(2)
    }

    await CropQuery.create({
      userId: req.user.id,
      moduleType: 'price',
      query: `${crop} - ${state}`,
      result
    })

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
