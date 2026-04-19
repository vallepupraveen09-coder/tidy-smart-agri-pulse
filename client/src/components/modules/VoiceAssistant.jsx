import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic, Send } from 'lucide-react'
import { API_BASE_URL } from '../../api.js'
export default function VoiceAssistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: Date.now(), text: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/voice-assist`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        },
        body: JSON.stringify({ message: input })
      })
      const data = await response.json()
      setMessages(prev => [...prev, { id: Date.now() + 1, text: data.response, sender: 'ai' }])
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
      className="space-y-6 h-screen flex flex-col"
    >
      <div className="flex items-center gap-3">
        <Mic className="text-purple-400" size={32} />
        <h2 className="text-3xl font-bold text-white">Voice Assistant</h2>
      </div>

      <div className="glass-card flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-200'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 px-4 py-2 rounded-lg text-gray-200">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about farming..."
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white p-2 rounded transition"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </motion.div>
  )
}
