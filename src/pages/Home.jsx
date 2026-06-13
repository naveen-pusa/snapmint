import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Products from './Products'

function Home() {

  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState([])

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('snapmint_cart')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  const [user] = useState(() => {
    try {
      const saved = localStorage.getItem('snapmint_loggedIn')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  useEffect(() => {
    localStorage.setItem('snapmint_cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories').then(({ data }) => {
      setCategoryList(data)
    })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('snapmint_loggedIn')
    navigate('/auth', { replace: true })
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
        onSignupClick={() => navigate('/auth')}
        onLogout={handleLogout}
        onLogoClick={() => { setSearch(''); setCategory(''); navigate('/') }}
      />

      {!search && !category && <Carousel />}

      <Products
       search={search}
        category={category}
        onSelectProduct={(product) => navigate(`/product/${product.id}`, { state: { product } })}
        onAddToCart={handleAddToCart}
      />

      <Footer />
    </>
  )
}

export default Home