export const API_BASE_URL = 'http://localhost:5000'

export async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
    }
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API Error')
  }
  
  return response.json()
}
