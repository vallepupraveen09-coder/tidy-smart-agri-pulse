import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Bug,
  BookOpen,
  Beaker,
  Mic,
  MapPin,
  Cloud
} from 'lucide-react'

const modules = [
  {
    id: 'price',
    icon: TrendingUp,
    title: 'Crop Price Prediction',
    desc: 'Real-time crop prices and market forecasts',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'disease',
    icon: Bug,
    title: 'Disease Detection',
    desc: 'AI-powered crop disease identification',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'guide',
    icon: BookOpen,
    title: 'Crop Guide',
    desc: 'Complete farming guides and best practices',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'pesticide',
    icon: Beaker,
    title: 'Pesticide Advisor',
    desc: 'Smart pesticide recommendations',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'voice',
    icon: Mic,
    title: 'Voice Assistant',
    desc: 'AI voice chat in your language',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'store',
    icon: MapPin,
    title: 'Store Finder',
    desc: 'Find nearby agricultural stores',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'weather',
    icon: Cloud,
    title: 'Weather Analysis',
    desc: 'Hyperlocal weather predictions',
    color: 'from-slate-500 to-gray-500'
  }
]

export default function ModulesGrid() {
  const navigate = useNavigate()

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-white text-center mb-16"
      >
        7 AI-Powered Modules
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {modules.map((module, idx) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -10 }}
            onClick={() => navigate('/register')}
            className="glass-card cursor-pointer group"
          >
            <div className={`bg-gradient-to-br ${module.color} p-4 rounded-lg mb-4 w-fit group-hover:scale-110 transition transform`}>
              <module.icon className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
            <p className="text-gray-300 mb-4">{module.desc}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-bold transition"
            >
              Explore
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
