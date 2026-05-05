import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('icas_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password, role) => {
    // Mock authentication - replace with actual API call
    const mockUser = {
      id: role === 'student' ? 'STU001' : 'ADM001',
      email,
      name: email.split('@')[0],
      role,
      token: 'mock-jwt-token'
    }
    
    setUser(mockUser)
    localStorage.setItem('icas_user', JSON.stringify(mockUser))
    return mockUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('icas_user')
  }

  const register = async (email, password, name, role) => {
    // Mock registration - replace with actual API call
    const mockUser = {
      id: role === 'student' ? 'STU' + Date.now() : 'ADM' + Date.now(),
      email,
      name,
      role,
      token: 'mock-jwt-token'
    }
    
    setUser(mockUser)
    localStorage.setItem('icas_user', JSON.stringify(mockUser))
    return mockUser
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
