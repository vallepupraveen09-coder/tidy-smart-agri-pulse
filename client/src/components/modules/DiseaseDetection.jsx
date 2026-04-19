import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bug, Upload } from 'lucide-react'
import { API_BASE_URL } from '../../api.js'

export default function DiseaseDetection() {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImage(file)
    setLoading(true)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch(`${API_BASE_URL}/api/disease-detect`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        }
      })
      const data = await response.json()
      setResult(data)
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
        <Bug className="text-red-400" size={32} />
        <h2 className="text-3xl font-bold text-white">Disease Detection</h2>
      </div>

      <div className="glass-card">
        <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer block">
            <Upload className="mx-auto mb-4 text-gray-400" size={40} />
            <p className="text-white font-bold mb-2">Upload Crop Image</p>
            <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
          </label>
        </div>

        {image && (
          <div className="mt-6">
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="max-h-60 mx-auto rounded"
            />
          </div>
        )}
      </div>

      {loading && (
        <div className="glass-card text-center">
          <p className="text-white">Analyzing image...</p>
        </div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Diagnosis</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Disease</p>
              <p className="text-xl font-bold text-red-400">{result.disease}</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Severity</p>
              <p className="text-xl font-bold text-yellow-400">{result.severity}</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Treatment</p>
              <p className="text-white">{result.treatment}</p>
            </div>
            <div className="bg-white/10 p-4 rounded">
              <p className="text-gray-300 text-sm">Prevention</p>
              <p className="text-white">{result.prevention}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
