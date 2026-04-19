import express from 'express'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { mockUserDB } from '../mockData.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields required' })
    }

    if (mockUserDB.emailExists(email)) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)
    const user = mockUserDB.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'farmer'
    })

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    )

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const user = mockUserDB.findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const passwordMatch = await bcryptjs.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get Profile
router.get('/profile', authenticate, (req, res) => {
  try {
    const user = mockUserDB.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const { password, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
