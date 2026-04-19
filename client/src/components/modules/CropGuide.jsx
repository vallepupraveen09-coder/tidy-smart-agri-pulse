import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { API_BASE_URL } from '../../api.js'

export default function CropGuide() {
  const [selectedCrop, setSelectedCrop] = useState('rice')
  const [result, setResult] = useState(null)

  const crops = ['rice', 'wheat', 'cotton', 'sugarcane', 'maize', 'groundnut']

  const handleFetchGuide = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/crop-guide?crop=${selectedCrop}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}` }
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
        <BookOpen className="text-yellow-400" size={32} />
        <h2 className="text-3xl font-bold text-white">Crop Growing Guide</h2>
      </div>

      <div className="glass-card">
        <div className="flex gap-4">
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-green-400"
          >
            {crops.map(c => (
              <option key={c} value={c}>{c.toUpperCase()}</option>
            ))}
          </select>
          <button
            onClick={handleFetchGuide}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-bold transition"
          >
            Get Guide
          </button>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {[
            { title: 'Sowing Time', content: result.sowingTime },
            { title: 'Growth Days', content: result.growthDays },
            { title: 'Water Requirements', content: result.waterNeeds },
            { title: 'Fertilizer', content: result.fertilizer },
            { title: 'Harvest Tips', content: result.harvestTips }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card"
            >
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.content}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
