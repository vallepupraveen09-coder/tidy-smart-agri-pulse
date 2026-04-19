import { motion } from 'framer-motion'
import { Leaf, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar({ modules, activeModule, setActiveModule, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 text-white"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed md:static w-64 h-screen bg-gradient-to-b from-green-900 to-emerald-900 p-6 md:translate-x-0 z-40 overflow-y-auto"
      >
        <div className="flex items-center gap-2 text-white font-bold text-2xl mb-8">
          <Leaf className="text-green-400" size={28} />
          AgriAI
        </div>

        <div className="mb-8">
          <p className="text-gray-300 text-sm">Logged in as:</p>
          <p className="text-white font-bold">{user?.name}</p>
        </div>

        <nav className="space-y-2 mb-8">
          {modules.map((module, idx) => (
            <motion.button
              key={module.id}
              onClick={() => {
                setActiveModule(module.id)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 rounded transition ${
                activeModule === module.id
                  ? 'bg-green-500 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
              whileHover={{ x: 5 }}
            >
              {module.name}
            </motion.button>
          ))}
        </nav>

        <motion.button
          onClick={() => {
            onLogout()
            setIsOpen(false)
          }}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded font-bold transition flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </motion.button>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
