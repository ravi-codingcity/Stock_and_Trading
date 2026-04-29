import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Markets from './pages/Markets'
import Portfolio from './pages/Portfolio'
import Watchlist from './pages/Watchlist'
import Screener from './pages/Screener'
import News from './pages/News'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="markets" element={<Markets />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="screener" element={<Screener />} />
        <Route path="news" element={<News />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
