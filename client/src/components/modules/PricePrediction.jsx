import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { API_BASE_URL } from '../../api.js'

export default function PricePrediction() {
  const [formData, setFormData] = useState({
    crop: 'rice',
    state: 'maharashtra',
    quantity: '',
    unit: 'quintal'
  })
  const [result, setResult] = useState(null)

  const crops = ['rice', 'wheat', 'cotton', 'sugarcane', 'maize', 'groundnut']
  const states = ['maharashtra', 'punjab', 'haryana', 'uttar pradesh', 'karnataka']

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/api/price-predict`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="text-green-400" size={32} />
        <h2 className="text-3xl font-bold text-white">Crop Price Prediction</h2>
      </div>

      <div className="glass-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">Crop</label>
              <select
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-green-400"
              >
                {crops.map(c => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-green-400"
              >
                {states.map(s => (
                  <option key={s} value={s}>{s.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-green-400"
              >
                <option value="quintal">Quintal</option>
                <option value="ton">Ton</option>
                <option value="kg">Kg</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded transition"
          >
            Get Price Prediction
          </button>
        </form>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Price Analysis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Current Price</p>
              <p className="text-2xl font-bold text-green-400">₹{result.currentPrice}/quintal</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Predicted Price</p>
              <p className="text-2xl font-bold text-blue-400">₹{result.predictedPrice}/quintal</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Expected Trend</p>
              <p className="text-2xl font-bold text-yellow-400">{result.trend}</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Estimated Income</p>
              <p className="text-2xl font-bold text-green-300">₹{result.estimatedIncome}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
