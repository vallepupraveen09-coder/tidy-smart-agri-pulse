import express from 'express'
import { authenticate } from '../middleware/auth.js'
import CropQuery from '../models/CropQuery.js'

const router = express.Router()

const cropGuideDatabase = {
  rice: {
    sowingTime: 'June - July',
    growthDays: '120-150 days',
    waterNeeds: '100-150 cm per season',
    fertilizer: 'N:P:K = 100:50:50 kg/hectare',
    harvestTips: 'Harvest when grain moisture is 20-22%'
  },
  wheat: {
    sowingTime: 'October - November',
    growthDays: '120-140 days',
    waterNeeds: '40-60 cm per season',
    fertilizer: 'N:P:K = 80:40:40 kg/hectare',
    harvestTips: 'Harvest at hard dough stage'
  },
  cotton: {
    sowingTime: 'March - May',
    growthDays: '160-180 days',
    waterNeeds: '60-80 cm per season',
    fertilizer: 'N:P:K = 100:50:40 kg/hectare',
    harvestTips: 'Pick when bolls burst, avoid mixing colors'
  },
  sugarcane: {
    sowingTime: 'October - December',
    growthDays: '300-360 days',
    waterNeeds: '150-250 cm per season',
    fertilizer: 'N:P:K = 150:80:80 kg/hectare',
    harvestTips: 'Harvest at 12 months after planting'
  }
}

router.get('/', authenticate, async (req, res) => {
  try {
    const { crop } = req.query
    const guide = cropGuideDatabase[crop?.toLowerCase()] || cropGuideDatabase.rice

    await CropQuery.create({
      userId: req.user.id,
      moduleType: 'guide',
      query: crop,
      result: guide
    })

    res.json(guide)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
