import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock } from 'lucide-react'
import { API_BASE_URL } from '../../api.js'

export default function StoreFinder() {
  const [district, setDistrict] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!district.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/store-finder?district=${district}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}` }
      })
      const data = await response.json()
      setResults(data.stores)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
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
        <MapPin className="text-indigo-400" size={32} />
        <h2 className="text-3xl font-bold text-white">Store Finder</h2>
      </div>

      <div className="glass-card">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter district name..."
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-6 py-2 rounded font-bold transition"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {results && (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((store, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card"
            >
              <h3 className="text-xl font-bold text-white mb-4">{store.name}</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-green-400" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-blue-400" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-yellow-400" />
                  <span>{store.hours}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
