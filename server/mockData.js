// Mock data storage (in-memory)
let users = [
  {
    _id: '1',
    name: 'Demo Farmer',
    email: 'farmer@agriai.com',
    password: '$2a$10$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5YmMxSUFgf46O', // farmer123
    phone: '9876543210',
    role: 'farmer'
  }
]

export const mockUserDB = {
  users,
  findByEmail: (email) => users.find(u => u.email === email),
  findById: (id) => users.find(u => u._id === id),
  create: (userData) => {
    const newUser = {
      _id: Date.now().toString(),
      ...userData
    }
    users.push(newUser)
    return newUser
  },
  emailExists: (email) => users.some(u => u.email === email)
}

export const mockQueries = []
