'use client'

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Rooms } from '@/pages/Rooms'
import { Bookings } from '@/pages/Bookings'
import { Guests } from '@/pages/Guests'
import { Payments } from '@/pages/Payments'
import { Maintenance } from '@/pages/Maintenance'
import { Compliance } from '@/pages/Compliance'
import { Analytics } from '@/pages/Analytics'
import { Staff } from '@/pages/Staff'
import { AuthPage } from '@/pages/Auth'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      setUser({ id: '1', email: 'admin@homestay.com' })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthPage onAuthSuccess={() => setUser({ id: '1', email: 'admin@homestay.com' })} />
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}