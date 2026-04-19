import { createContext, useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

// Configure axios to use backend API
axios.defaults.baseURL = 'http://localhost:5000'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('authToken') || null)
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [token])

  const register = useCallback(async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/auth/register', formData)
      setToken(response.data.token)
      setUser(response.data.user)
      setIsAuthenticated(true)
      localStorage.setItem('authToken', response.data.token)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      setToken(response.data.token)
      setUser(response.data.user)
      setIsAuthenticated(true)
      localStorage.setItem('authToken', response.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('authToken')
    delete axios.defaults.headers.common['Authorization']
  }, [])

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
