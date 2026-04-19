import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Menu } from 'lucide-react'
import { LanguageContext } from '../context/LanguageContext'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { language, changeLanguage, languages, t } = useContext(LanguageContext)
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect sticky top-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-2xl">
          <Leaf className="text-green-400" size={28} />
          AgriAI
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`px-3 py-1 rounded transition ${
                  language === lang
                    ? 'bg-green-500 text-white'
                    : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {isAuthenticated ? (
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-bold transition"
            >
              {t('logout')}
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-bold transition"
            >
              {t('login')}
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
