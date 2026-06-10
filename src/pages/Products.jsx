import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ITEMS_PER_PAGE = 15

function Products({ onSelectProduct, onAddToCart, search, category }) {

  const [product, setProduct] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [addedIds, setAddedIds] = useState([])  // tracks which product was just added

  // Single useEffect — reacts to search OR category change
  useEffect(() => {
    async function fetchProducts() {
      let url
      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}&limit=100`
      } else if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=100`
      } else {
        url = `https://dummyjson.com/products?limit=50`
      }
      let { data } = await axios.get(url)
      setProduct(data.products)
      setCurrentPage(1)
    }
    fetchProducts()
  }, [search, category])

  // Pagination logic
  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = product.slice(startIndex, endIndex)

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageNumbers = () => {
    const pages = []
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + 4)
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4)
    for (let i = startPage; i <= endPage; i++) pages.push(i)
    return pages
  }

  // Handle Add to Cart with animation feedback
  const handleAddToCart = (item) => {
    onAddToCart(item)
    setAddedIds(prev => [...prev, item.id])
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== item.id))
    }, 1000)
  }

  // ── FRAMER MOTION VARIANTS ──

  // Container — staggers children one by one
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.07,  // each card appears 0.07s after the previous
      }
    }
  }

  // Each product card fades up from below
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  }

  // Page heading slides in from left
  const headingVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  }

  return (
    <div className="container my-4">

      {/* Animated heading */}
      <motion.h5
        className="fw-bold mb-3"
        variants={headingVariants}
        initial="hidden"
        animate="show"
        key={`${search}-${category}`}  // re-animates on search/category change
      >
        {/* {product.length} Products
        {search ? ` for "${search}"` : category ? ` in "${category}"` : ''}
        {totalPages > 1 && (
          <span className="text-muted fw-normal fs-6 ms-2">
            — Page {currentPage} of {totalPages}
          </span>
        )} */}
      </motion.h5>

      {/* Product Cards Grid with stagger animation */}
      <AnimatePresence mode="wait">
        <motion.div
          className="row"
          key={`${search}-${category}-${currentPage}`}  // re-triggers animation on any change
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          {currentProducts.length === 0 ? (
            <motion.div
              className="col-12 text-center py-5 text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No products found.
            </motion.div>
          ) : (
            currentProducts.map(item => (
              <motion.div
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}  // lifts on hover
              >
                <div
                  className="card h-100 shadow-sm border-0"
                  style={{ overflow: 'hidden' }}
                >

                  {/* Product Image — scales on hover */}
                  <motion.img
                    src={item.thumbnail}
                    className="card-img-top p-2"
                    alt={item.title}
                    style={{ height: '180px', objectFit: 'contain', cursor: 'pointer' }}
                    onClick={() => onSelectProduct(item)}
                    whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
                  />

                  <div className="card-body d-flex flex-column">

                    {/* Category Badge */}
                    <span className="badge bg-success mb-2" style={{ width: 'fit-content' }}>
                      {item.category}
                    </span>

                    {/* Title */}
                    <h6
                      className="card-title fw-bold"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onSelectProduct(item)}
                    >
                      {item.title}
                    </h6>

                    {/* Description */}
                    <p className="card-text text-muted small flex-grow-1">
                      {item.description.slice(0, 70)}...
                    </p>

                    {/* Price + Rating */}
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span className="fw-bold fs-5">${item.price}</span>
                      <span className="text-warning small">⭐ {item.rating}</span>
                    </div>

                    {/* Add to Cart Button — animates when clicked */}
                    <motion.button
                      className={`btn btn-sm mt-3 w-100 ${addedIds.includes(item.id) ? 'btn-success' : 'btn-dark'}`}
                      onClick={() => handleAddToCart(item)}
                      whileTap={{ scale: 0.93 }}  // press down effect on click
                      animate={
                        addedIds.includes(item.id)
                          ? { scale: [1, 1.07, 1] }  // bounce when added
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {addedIds.includes(item.id) ? '✓ Added!' : 'Add to Cart'}
                    </motion.button>

                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="d-flex justify-content-center align-items-center mt-4 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <nav>
            <ul className="pagination pagination-md">

              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(1)}>«</button>
              </li>

              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>‹</button>
              </li>

              {getPageNumbers().map(num => (
                <li key={num} className={`page-item ${currentPage === num ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    style={currentPage === num ? { backgroundColor: '#004851', borderColor: '#004851' } : {}}
                    onClick={() => handlePageChange(num)}
                  >
                    {num}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>›</button>
              </li>

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(totalPages)}>»</button>
              </li>

            </ul>
          </nav>

          <span className="text-muted small ms-3">
            Showing {startIndex + 1}–{Math.min(endIndex, product.length)} of {product.length}
          </span>
        </motion.div>
      )}

    </div>
  )
}

export default Products