import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
})

const STORAGE_KEY = 'apex-auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = useCallback(async ({ email, password, remember }) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    if (!email || !password) throw new Error('Email and password are required')
    const u = {
      name: email.split('@')[0].replace(/\W/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Trader',
      email,
      remember: !!remember,
      createdAt: new Date().toISOString(),
    }
    setUser(u)
    return u
  }, [])

  const signup = useCallback(async ({ name, email, password }) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    if (!name || !email || !password) throw new Error('All fields are required')
    const u = { name, email, createdAt: new Date().toISOString() }
    setUser(u)
    return u
  }, [])

  const logout = useCallback(() => setUser(null), [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
