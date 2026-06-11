import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const user = (() => {
  try {
    const saved = localStorage.getItem('snapmint_loggedIn')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })()

  if (!user) return <Navigate to="/auth" replace />
  return children
}

export default ProtectedRoute