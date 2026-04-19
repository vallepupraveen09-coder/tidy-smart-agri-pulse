import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthContext } from '../../context/AuthContext'
import { LanguageContext } from '../../context/LanguageContext'
import { Leaf } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading } = useContext(AuthContext)
  const { t } = useContext(LanguageContext)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass-card">
          <div className="flex justify-center mb-6">
            <Leaf className="text-green-400" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white text-center mb-6">AgriAI</h1>
          <p className="text-gray-200 text-center mb-8">{t('login')}</p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-200 mb-2">{t('email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label className="block text-gray-200 mb-2">{t('password')}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-bold py-2 rounded transition duration-200"
            >
              {loading ? 'Logging in...' : t('login')}
            </button>
          </form>

          <p className="text-gray-300 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-400 hover:text-green-300 font-bold">
              {t('register')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
