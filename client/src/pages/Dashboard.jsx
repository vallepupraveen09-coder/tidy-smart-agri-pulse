import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../context/AuthContext'
import { LanguageContext } from '../context/LanguageContext'
import Sidebar from '../components/Sidebar'
import PricePrediction from '../components/modules/PricePrediction'
import DiseaseDetection from '../components/modules/DiseaseDetection'
import CropGuide from '../components/modules/CropGuide'
import PesticideAdvisor from '../components/modules/PesticideAdvisor'
import VoiceAssistant from '../components/modules/VoiceAssistant'
import StoreFinder from '../components/modules/StoreFinder'
import WeatherAnalysis from '../components/modules/WeatherAnalysis'

const modules = [
  { id: 'price', name: 'Crop Price Prediction', component: PricePrediction },
  { id: 'disease', name: 'Disease Detection', component: DiseaseDetection },
  { id: 'guide', name: 'Crop Guide', component: CropGuide },
  { id: 'pesticide', name: 'Pesticide Advisor', component: PesticideAdvisor },
  { id: 'voice', name: 'Voice Assistant', component: VoiceAssistant },
  { id: 'store', name: 'Store Finder', component: StoreFinder },
  { id: 'weather', name: 'Weather Analysis', component: WeatherAnalysis }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  const { t } = useContext(LanguageContext)
  const [activeModule, setActiveModule] = useState('price')

  if (!user) {
    navigate('/login')
    return null
  }

  const currentModule = modules.find(m => m.id === activeModule)
  const CurrentComponent = currentModule?.component

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex">
      <Sidebar 
        modules={modules} 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        user={user}
        onLogout={logout}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-8"
      >
        <div className="max-w-6xl mx-auto">
          {CurrentComponent && <CurrentComponent />}
        </div>
      </motion.div>
    </div>
  )
}
