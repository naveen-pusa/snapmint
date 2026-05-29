import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AuthModal({ onAuthSuccess }) {

  const [tab, setTab] = useState('signup')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loginData, setLoginData] = useState({ email: '', password: '' })

  // ── SIGN UP ──
  const handleSignup = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { name, email, password, confirmPassword } = signupData

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.'); return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.'); return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.'); return
    }

    const users = JSON.parse(localStorage.getItem('snapmint_users') || '[]')
    const alreadyExists = users.find(u => u.email === email)
    if (alreadyExists) {
      setError('Email already registered. Please login.'); return
    }

    // Save new user
    users.push({ name, email, password })
    localStorage.setItem('snapmint_users', JSON.stringify(users))
    localStorage.setItem('snapmint_loggedIn', JSON.stringify({ name, email }))

    setSuccess(`Welcome, ${name}! Account created.`)
    setTimeout(() => onAuthSuccess({ name, email }), 1000)
  }

  // ── LOGIN ──
  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { email, password } = loginData

    if (!email || !password) {
      setError('Email and password are required.'); return
    }

    const users = JSON.parse(localStorage.getItem('snapmint_users') || '[]')
    const user = users.find(u => u.email === email && u.password === password)

    if (!user) {
      setError('Invalid email or password.'); return
    }

    localStorage.setItem('snapmint_loggedIn', JSON.stringify({ name: user.name, email: user.email }))
    setSuccess(`Welcome back, ${user.name}!`)
    setTimeout(() => onAuthSuccess({ name: user.name, email: user.email }), 1000)
  }

  return (
    // ── FULL SCREEN BLOCKER — covers entire page, no close button ──
    <div
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        backgroundColor: '#004851',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99,199,207,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168,224,99,0.1) 0%, transparent 40%)',
        pointerEvents: 'none'
      }} />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          backgroundColor: '#fff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top — Logo */}
        <div style={{ backgroundColor: '#004851', padding: '28px 28px 20px' }}>
          <h2 style={{ color: '#fff', fontWeight: '800', fontSize: '32px', margin: 0 }}>
            snap<span style={{ color: '#63c7cf', fontWeight: '400' }}>mint</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', marginTop: '6px', marginBottom: 0 }}>
            {tab === 'signup'
              ? '👋 Create your account to continue'
              : '🔐 Login to your account to continue'}
          </p>
        </div>

        {/* Tabs */}
        <div className="d-flex" style={{ borderBottom: '2px solid #f0f0f0' }}>
          {['signup', 'login'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); setSuccess('') }}
              style={{
                flex: 1, padding: '14px', border: 'none', background: 'none',
                fontWeight: '700', fontSize: '15px', cursor: 'pointer',
                color: tab === t ? '#004851' : '#bbb',
                borderBottom: tab === t ? '3px solid #004851' : '3px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {t === 'signup' ? '📝 Sign Up' : '🔑 Login'}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div style={{ padding: '24px 28px' }}>

          {/* Error / Success */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="alert alert-danger py-2 small"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              >
                ⚠️ {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                className="alert alert-success py-2 small"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              >
                ✅ {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SIGNUP FORM */}
          {tab === 'signup' && (
            <motion.form
              onSubmit={handleSignup}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-3">
                <label className="form-label fw-bold small">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your full name"
                  style={{ borderRadius: '10px', height: '46px' }}
                  value={signupData.name}
                  onChange={e => setSignupData({ ...signupData, name: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold small">Email Address</label>
                <input type="email" className="form-control" placeholder="Enter your email"
                  style={{ borderRadius: '10px', height: '46px' }}
                  value={signupData.email}
                  onChange={e => setSignupData({ ...signupData, email: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold small">Password</label>
                <input type="password" className="form-control" placeholder="Min 6 characters"
                  style={{ borderRadius: '10px', height: '46px' }}
                  value={signupData.password}
                  onChange={e => setSignupData({ ...signupData, password: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold small">Confirm Password</label>
                <input type="password" className="form-control" placeholder="Re-enter your password"
                  style={{ borderRadius: '10px', height: '46px' }}
                  value={signupData.confirmPassword}
                  onChange={e => setSignupData({ ...signupData, confirmPassword: e.target.value })} />
              </div>
              <motion.button type="submit" className="btn w-100 fw-bold"
                style={{ backgroundColor: '#004851', color: '#fff', borderRadius: '10px', height: '48px', fontSize: '16px' }}
                whileTap={{ scale: 0.97 }}>
                Create Account →
              </motion.button>
              <p className="text-center text-muted small mt-3 mb-0">
                Already have an account?{' '}
                <span style={{ color: '#004851', cursor: 'pointer', fontWeight: '700' }}
                  onClick={() => { setTab('login'); setError(''); setSuccess('') }}>
                  Login here
                </span>
              </p>
            </motion.form>
          )}

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <motion.form
              onSubmit={handleLogin}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-3">
                <label className="form-label fw-bold small">Email Address</label>
                <input type="email" className="form-control" placeholder="Enter your email"
                  style={{ borderRadius: '10px', height: '46px' }}
                  value={loginData.email}
                  onChange={e => setLoginData({ ...loginData, email: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold small">Password</label>
                <input type="password" className="form-control" placeholder="Enter your password"
                  style={{ borderRadius: '10px', height: '46px' }}
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })} />
              </div>
              <motion.button type="submit" className="btn w-100 fw-bold"
                style={{ backgroundColor: '#004851', color: '#fff', borderRadius: '10px', height: '48px', fontSize: '16px' }}
                whileTap={{ scale: 0.97 }}>
                Login →
              </motion.button>
              <p className="text-center text-muted small mt-3 mb-0">
                Don't have an account?{' '}
                <span style={{ color: '#004851', cursor: 'pointer', fontWeight: '700' }}
                  onClick={() => { setTab('signup'); setError(''); setSuccess('') }}>
                  Sign up here
                </span>
              </p>
            </motion.form>
          )}

        </div>
      </motion.div>
    </div>
  )
}

export default AuthModal