import express from 'express'
import { authenticate } from '../middleware/auth.js'
import CropQuery from '../models/CropQuery.js'

const router = express.Router()

const pesticideDatabase = {
  'rice-leaf blight': {
    name: 'Tricyclazole 75% WP',
    dosage: '0.6 gm per liter of water',
    method: 'Spray on foliage',
    safety: 'Wear protective gear. Wash hands after use'
  },
  'wheat-powdery mildew': {
    name: 'Sulfur 80% WP',
    dosage: '2 gm per liter of water',
    method: 'Spray on affected areas',
    safety: 'Use during cool hours. Not effective above 30°C'
  },
  'cotton-rust': {
    name: 'Mancozeb 75% WP',
    dosage: '2.5 gm per liter of water',
    method: 'Spray thoroughly',
    safety: 'Do not apply within 7 days of harvest'
  },
  'sugarcane-smut': {
    name: 'Carbaryl 50% WP',
    dosage: '2 gm per liter of water',
    method: 'Spray on stems',
    safety: 'Avoid contact with skin and eyes'
  }
}

router.post('/', authenticate, async (req, res) => {
  try {
    const { crop, disease } = req.body
    const key = `${crop}-${disease}`.toLowerCase()
    const pesticide = pesticideDatabase[key] || Object.values(pesticideDatabase)[0]

    await CropQuery.create({
      userId: req.user.id,
      moduleType: 'pesticide',
      query: `${crop} - ${disease}`,
      result: pesticide
    })

    res.json(pesticide)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
