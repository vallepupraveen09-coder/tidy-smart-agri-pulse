import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Droplets, Wind, Sun } from 'lucide-react'
import { API_BASE_URL } from '../../api.js'

export default function WeatherAnalysis() {
  const [state, setState] = useState('maharashtra')
  const [weather, setWeather] = useState(null)

  const states = [
    'maharashtra', 'punjab', 'haryana', 'uttar pradesh', 'karnataka',
    'andhra pradesh', 'telangana', 'tamil nadu', 'bengal', 'rajasthan'
  ]

  const handleFetchWeather = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/weather?state=${state}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}` }
      })
      const data = await response.json()
      setWeather(data)
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
        <Cloud className="text-slate-400" size={32} />
        <h2 className="text-3xl font-bold text-white">Weather Analysis</h2>
      </div>

      <div className="glass-card">
        <div className="flex gap-4">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:border-green-400"
          >
            {states.map(s => (
              <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
          <button
            onClick={handleFetchWeather}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-bold transition"
          >
            Get Weather
          </button>
        </div>
      </div>

      {weather && (
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Sun, label: 'Temperature', value: `${weather.temperature}°C` },
            { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%` },
            { icon: Cloud, label: 'Rainfall', value: `${weather.rainfall}mm` },
            { icon: Wind, label: 'Wind Speed', value: `${weather.windSpeed} km/h` }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card text-center"
            >
              <item.icon className="mx-auto mb-2 text-yellow-400" size={32} />
              <p className="text-gray-300 text-sm mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-white">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {weather && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <h3 className="text-xl font-bold text-white mb-4">Forecast</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm mb-2">Season</p>
              <p className="text-lg font-bold text-green-400">{weather.season}</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm mb-2">UV Index</p>
              <p className="text-lg font-bold text-yellow-400">{weather.uvIndex}</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm mb-2">Alert</p>
              <p className="text-lg font-bold text-red-400">{weather.alert}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
