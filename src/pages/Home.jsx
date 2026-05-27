import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Products from './Products'
// import SingleProduct from './SingleProduct'
// import Cart from './Cart'


function Home() {

  // ── Page State ──
  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)

  // ── Search & Category — shared between Header and Products ──
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState([])

  // ── Cart State ──
  const [cartItems, setCartItems] = useState([])

  // Fetch category list once on mount — passed to Header dropdown
  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories').then(({ data }) => {
      setCategoryList(data)
    })
  }, [])

  // ── Cart Functions ──
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty < 1) { handleRemoveItem(id); return }
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, qty: newQty } : item)
    )
  }

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleClearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <>
      {/* Header — sets search and category state */}
      <Header
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categoryList={categoryList}
        cartCount={cartCount}
        onCartClick={() => setPage('cart')}
        onLogoClick={() => {
          setPage('home')
          setSearch('')
          setCategory('')
        }}
      />

      {page === 'home' && (
        <>
          {/* Only show carousel when not searching or filtering */}
          {!search && !category && <Carousel />}

          {/* Products reads search and category as props */}
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

      {page === 'cart' && (
        <Cart
          cartItems={cartItems}
          onBack={() => setPage('home')}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      )}

      <Footer />
    </>
  )
}

export default Home