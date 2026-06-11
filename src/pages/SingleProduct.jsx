import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SingleProduct() {

  const { id } = useParams()              // gets :id from /product/:id
  const location = useLocation()          // gets state passed via navigate()
  const navigate = useNavigate()

  // Use product from route state if available, else fetch from API
  const [product, setProduct] = useState(location.state?.product || null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!product) {
      // Direct URL open or refresh — fetch from API using id
      axios.get(`https://dummyjson.com/products/${id}`).then(({ data }) => {
        setProduct(data)
        setSelectedImage(data.thumbnail)
      })
    } else {
      setSelectedImage(product.thumbnail)
    }
  }, [id])

  const handleAddToCart = () => {
   const cartItems = JSON.parse(localStorage.getItem('snapmint_cart') || '[]')
   const existingIndex = cartItems.findIndex(item => item.id === product.id)
    if (existingIndex !== -1) {
        for (let i = 0; i < quantity; i++) {
        cartItems[existingIndex].qty += 1
      }
    } else {
      cartItems.push({ ...product, qty: quantity })
    }
    localStorage.setItem('snapmint_cart', JSON.stringify(cartItems))
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (!product) return (
    <div className="text-center py-5">
      <div className="spinner-border" style={{ color: '#004851' }} />
    </div>
  )

  return (
    <div className="container my-4">

      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate('/')}>
        ← Back to Products
      </button>

      <div className="row g-4">

        {/* LEFT — Images */}
        <div className="col-md-5">
          <div className="border rounded p-3 mb-3 d-flex align-items-center justify-content-center bg-light"
            style={{ height: '350px' }}>
            <img src={selectedImage} alt={product.title}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {product.images?.map((img, i) => (
              <img key={i} src={img} alt={`img-${i}`} onClick={() => setSelectedImage(img)}
                style={{
                  width: '70px', height: '70px', objectFit: 'contain', cursor: 'pointer',
                  border: selectedImage === img ? '2px solid #004851' : '1px solid #ddd',
                  borderRadius: '8px', padding: '4px', background: '#f8f8f8'
                }} />
            ))}
          </div>
        </div>

        {/* RIGHT — Details */}
        <div className="col-md-7">
          <span className="badge bg-success mb-2">{product.category}</span>
          <h2 className="fw-bold mb-2">{product.title}</h2>

          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="text-warning fw-bold">⭐ {product.rating}</span>
            <span className={`badge ${product.stock > 10 ? 'bg-success' : 'bg-danger'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
            <span className="text-muted small">Brand: {product.brand}</span>
          </div>

          <div className="mb-3">
            <span className="fs-2 fw-bold">${product.price}</span>
            <span className="ms-3 badge bg-danger">{product.discountPercentage}% OFF</span>
          </div>

          <p className="text-muted mb-4">{product.description}</p>

          {/* Quantity */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <span className="fw-bold">Quantity:</span>
            <div className="d-flex align-items-center border rounded overflow-hidden">
              <button className="btn btn-light px-3" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span className="px-4 fw-bold">{quantity}</span>
              <button className="btn btn-light px-3" onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
            </div>
          </div>

          <button
            className={`btn btn-lg px-5 ${added ? 'btn-success' : 'btn-dark'}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
          </button>

          <div className="mt-4 p-3 bg-light rounded">
            <p className="mb-1 small"><strong>SKU:</strong> {product.sku || 'N/A'}</p>
            <p className="mb-1 small"><strong>Warranty:</strong> {product.warrantyInformation || 'N/A'}</p>
            <p className="mb-0 small"><strong>Shipping:</strong> {product.shippingInformation || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct