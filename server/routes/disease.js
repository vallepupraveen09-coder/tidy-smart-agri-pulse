import express from 'express'
import { authenticate } from '../middleware/auth.js'
import CropQuery from '../models/CropQuery.js'

const router = express.Router()

const diseaseDatabase = {
  'leaf blight': {
    severity: 'High',
    treatment: 'Apply fungicide every 10 days. Use Tricyclazole or Carbendazim.',
    prevention: 'Ensure proper drainage, avoid overhead watering, remove infected leaves'
  },
  'powdery mildew': {
    severity: 'Medium',
    treatment: 'Apply sulfur-based fungicides. Spray every 7-10 days.',
    prevention: 'Maintain plant spacing, improve air circulation, remove infected leaves'
  },
  'rust': {
    severity: 'High',
    treatment: 'Use Mancozeb or Propineb fungicides. Apply preventively.',
    prevention: 'Plant resistant varieties, maintain field hygiene, rotate crops'
  }
}

router.post('/', authenticate, async (req, res) => {
  try {
    const diseases = Object.keys(diseaseDatabase)
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)]
    const diseaseInfo = diseaseDatabase[randomDisease]

    const result = {
      disease: randomDisease,
      ...diseaseInfo
    }

    await CropQuery.create({
      userId: req.user.id,
      moduleType: 'disease',
      query: 'Image uploaded',
      result
    })

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
