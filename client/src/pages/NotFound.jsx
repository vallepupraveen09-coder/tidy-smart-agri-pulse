import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white"
      >
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded font-bold transition duration-200"
        >
          Go Home
        </button>
      </motion.div>
    </div>
  )
}
