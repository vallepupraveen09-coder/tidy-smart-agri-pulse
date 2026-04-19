import express from 'express'
import { authenticate } from '../middleware/auth.js'
import CropQuery from '../models/CropQuery.js'

const router = express.Router()

const voiceAnswers = {
  water: 'For most crops, water requirement is 50-100 cm per season. Check soil moisture before irrigating.',
  fertilizer: 'Use balanced fertilizers NPK ratio. Apply in 2-3 splits during growing season.',
  disease: 'Monitor crops regularly for signs of disease. Early detection is key to management.',
  price: 'Check local mandi prices daily. Consider market trends before selling.',
  weather: 'Plan irrigation based on rainfall forecast. Avoid pesticide spray before rain.',
  harvest: 'Harvest at proper maturity. Use early morning or late evening for fresh produce.'
}

router.post('/', authenticate, async (req, res) => {
  try {
    const { message } = req.body
    const keywords = Object.keys(voiceAnswers)
    const keyword = keywords.find(k => message.toLowerCase().includes(k))
    const response = voiceAnswers[keyword] || 'Please ask about water, fertilizer, disease, price, weather, or harvest.'

    await CropQuery.create({
      userId: req.user.id,
      moduleType: 'voice',
      query: message,
      result: { response }
    })

    res.json({ response })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
