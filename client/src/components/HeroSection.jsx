import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LanguageContext } from '../context/LanguageContext'
import { AuthContext } from '../context/AuthContext'
import { Leaf, TrendingUp, Zap } from 'lucide-react'

export default function HeroSection() {
  const { t } = useContext(LanguageContext)
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('hero_title')}</h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10">{t('hero_subtitle')}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
          className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg text-lg font-bold transition transform"
        >
          {t('cta_button')}
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: TrendingUp, value: '₹4.2T', label: 'Agricultural GDP' },
          { icon: Zap, value: '7 AI', label: 'Powered Modules' },
          { icon: Leaf, value: '4', label: 'Languages' }
        ].map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="glass-card text-center text-white"
          >
            <card.icon className="mx-auto mb-4 text-green-400" size={40} />
            <p className="text-3xl font-bold mb-2">{card.value}</p>
            <p className="text-gray-300">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
