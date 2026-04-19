import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LanguageContext } from '../context/LanguageContext'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ModulesGrid from '../components/ModulesGrid'
import Footer from '../components/Footer'

export default function LandingPage() {
  const { t } = useContext(LanguageContext)
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate('/dashboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900"
    >
      <Navbar />
      <HeroSection />
      <ModulesGrid />
      <Footer />
    </motion.div>
  )
}
