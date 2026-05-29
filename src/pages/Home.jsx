import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Products from './Products'
// import SingleProduct from './SingleProduct'
import AuthModal from '../components/AuthModal'

function Home() {

  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState([])

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('snapmint_cart')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  // ── AUTH: check if already logged in ──
  // If logged in → user = { name, email }, app opens directly
  // If NOT logged in → user = null, AuthModal shows and BLOCKS the app
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('snapmint_loggedIn')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  // Save cart on change
  useEffect(() => {
    localStorage.setItem('snapmint_cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories').then(({ data }) => {
      setCategoryList(data)
    })
  }, [])

  // Called when signup or login succeeds — unlocks the app
  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('snapmint_loggedIn')
  }

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id)
      if (existingIndex !== -1) {
        const updated = [...prev]
        updated[existingIndex] = { ...updated[existingIndex], qty: updated[existingIndex].qty + 1 }
        return updated
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty < 1) { handleRemoveItem(id); return }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item))
  }

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleClearCart = () => {
    setCartItems([])
    localStorage.removeItem('snapmint_cart')
  }

  // ── KEY LOGIC ──
  // If user is null (not logged in) → show ONLY the AuthModal, nothing else renders
  // If user exists → show the full app
  if (!user) {
    return (
      <AuthModal onAuthSuccess={handleAuthSuccess} />
    )
  }

  // ── FULL APP — only renders after login/signup ──
  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categoryList={categoryList}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        user={user}
        onSignupClick={() => {}}
        onLogout={handleLogout}
        onLogoClick={() => { setPage('home'); setSearch(''); setCategory('') }}
      />

      {page === 'home' && (
        <>
          {!search && !category && <Carousel />}
          <Products
            search={search}
            category={category}
            onSelectProduct={(product) => { setSelectedProduct(product); setPage('single') }}
            onAddToCart={handleAddToCart}
          />
        </>
      )}

      {page === 'single' && selectedProduct && (
        <SingleProduct
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={() => setPage('home')}
        />
      )}

      <Footer />
    </>
  )
}

export default Home