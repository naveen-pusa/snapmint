import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Products from './Products'
// import SingleProduct from './SingleProduct'

function Home() {

  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Search & Category
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState([])

  // ── CART STATE ──
  // Initialize from localStorage so cart survives page refresh
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('snapmint_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // ── SAVE TO LOCALSTORAGE every time cartItems changes ──
  // This is why cart persists on refresh
  useEffect(() => {
    localStorage.setItem('snapmint_cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Fetch category list once on mount
  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories').then(({ data }) => {
      setCategoryList(data)
    })
  }, [])

  // ── ADD TO CART ──
  // FIXED: uses functional update with strict id check
  // Same product → qty+1 only. New product → add with qty:1
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      // Check if this exact product id already exists
      const existingIndex = prev.findIndex(item => item.id === product.id)

      if (existingIndex !== -1) {
        // Product already in cart → only increase quantity, do NOT add new item
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + 1
        }
        return updated
      }

      // Product not in cart → add as new item with qty: 1
      return [...prev, { ...product, qty: 1 }]
    })
  }

  // ── UPDATE QUANTITY ──
  const handleUpdateQuantity = (id, newQty) => {
    if (newQty < 1) {
      handleRemoveItem(id)
      return
    }
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, qty: newQty } : item)
    )
  }

  // ── REMOVE SINGLE ITEM ──
  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  // ── CLEAR ALL — also clears localStorage ──
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
        onLogoClick={() => {
          setPage('home')
          setSearch('')
          setCategory('')
        }}
      />

      {page === 'home' && (
        <>
          {!search && !category && <Carousel />}
          <Products
            search={search}
            category={category}
            onSelectProduct={(product) => {
              setSelectedProduct(product)
              setPage('single')
            }}
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