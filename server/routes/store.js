import express from 'express'
import { authenticate } from '../middleware/auth.js'
import CropQuery from '../models/CropQuery.js'

const router = express.Router()

const storeDatabase = {
  'nashik': [
    { name: 'Krishi Kendra', address: 'Nashik City Center', phone: '+91 9876543210', hours: '9 AM - 6 PM' },
    { name: 'Agro Supplies', address: 'Nashik Mandi', phone: '+91 9876543211', hours: '8 AM - 7 PM' }
  ],
  'belgaum': [
    { name: 'Farm Store', address: 'Belgaum Main', phone: '+91 9876543212', hours: '9 AM - 6 PM' },
    { name: 'Agri Hub', address: 'Belgaum Market', phone: '+91 9876543213', hours: '8 AM - 7 PM' }
  ],
  'bengaluru': [
    { name: 'Urban Agri', address: 'Bengaluru Central', phone: '+91 9876543214', hours: '10 AM - 8 PM' },
    { name: 'Farmer\'s Market', address: 'Bengaluru East', phone: '+91 9876543215', hours: '9 AM - 7 PM' }
  ]
}

router.get('/', authenticate, async (req, res) => {
  try {
    const { district } = req.query
    const stores = storeDatabase[district?.toLowerCase()] || storeDatabase.nashik

    await CropQuery.create({
      userId: req.user.id,
      moduleType: 'store',
      query: district,
      result: { stores }
    })

    res.json({ stores })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
