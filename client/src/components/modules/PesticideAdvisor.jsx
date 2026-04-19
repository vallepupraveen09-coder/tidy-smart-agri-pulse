import { useState } from 'react'
import { motion } from 'framer-motion'
import { Beaker } from 'lucide-react'
import { API_BASE_URL } from '../../api.js'

export default function PesticideAdvisor() {
  const [formData, setFormData] = useState({ crop: 'rice', disease: 'leaf blight' })
  const [result, setResult] = useState(null)

  const crops = ['rice', 'wheat', 'cotton', 'sugarcane']
  const diseases = ['leaf blight', 'powdery mildew', 'rust', 'leaf spot']

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/api/pesticide-advice`, {
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
        <Beaker className="text-green-400" size={32} />
        <h2 className="text-3xl font-bold text-white">Pesticide Advisor</h2>
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
              <label className="block text-white mb-2">Disease/Pest</label>
              <select
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-green-400"
              >
                {diseases.map(d => (
                  <option key={d} value={d}>{d.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded transition"
          >
            Get Recommendation
          </button>
        </form>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Recommended Pesticide</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Pesticide Name</p>
              <p className="text-xl font-bold text-blue-400">{result.name}</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Dosage</p>
              <p className="text-white">{result.dosage}</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Application Method</p>
              <p className="text-white">{result.method}</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Safety</p>
              <p className="text-white">{result.safety}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
