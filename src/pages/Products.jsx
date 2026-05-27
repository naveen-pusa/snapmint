import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ITEMS_PER_PAGE = 15  // show 15 products per page

function Products({ onSelectProduct, onAddToCart, search, category }) {

  const [product, setProduct] = useState([])        // all fetched products
  const [currentPage, setCurrentPage] = useState(1) // current active page

  // ── Single useEffect — reacts to search OR category change ──
  useEffect(() => {

    async function fetchProducts() {
      let url

      if (search) {
        // Search — fetch up to 100 results
        url = `https://dummyjson.com/products/search?q=${search}&limit=100`
      } else if (category) {
        // Category — fetch all products in that category
        url = `https://dummyjson.com/products/category/${category}?limit=100`
      } else {
        // Default — fetch first 50 products on initial load
        url = `https://dummyjson.com/products?limit=50`
      }

      let { data } = await axios.get(url)
      setProduct(data.products)
      setCurrentPage(1)  // ← reset to page 1 whenever filter changes
    }

    fetchProducts()

  }, [search, category])  // re-runs when search or category changes

  // ── Pagination Logic ──
  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE)

  // Slice the product array to only show current page items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = product.slice(startIndex, endIndex)

  // Scroll to top when page changes
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Build page number buttons — show max 5 page buttons at a time
  const getPageNumbers = () => {
    const pages = []
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + 4)

    // Adjust if near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="container my-4">

      {/* Result count label */}
      {/* <h5 className="fw-bold mb-3">
        {product.length} Products
        {search ? ` for "${search}"` : category ? ` in "${category}"` : ''}
        {totalPages > 1 && (
          <span className="text-muted fw-normal fs-6 ms-2">
            — Page {currentPage} of {totalPages}
          </span>
        )}
      </h5> */}

      {/* Product Cards — only currentProducts (15 at a time) */}
      <div className="row">
        {currentProducts.length === 0 ? (
          <div className="col-12 text-center py-5 text-muted">
            No products found.
          </div>
        ) : (
          currentProducts.map(item => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm border-0">

                {/* Product Image */}
                <img
                  src={item.thumbnail}
                  className="card-img-top p-2"
                  alt={item.title}
                  style={{ height: '180px', objectFit: 'contain', cursor: 'pointer' }}
                  onClick={() => onSelectProduct(item)}
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

                  {/* Add to Cart */}
                  <button
                    className="btn btn-dark btn-sm mt-3 w-100"
                    onClick={() => onAddToCart(item)}
                  >
                    Add to Cart
                  </button>

                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── PAGINATION — only shows if more than 1 page ── */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
          <nav>
            <ul className="pagination pagination-md">

              {/* First Page button */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(1)}>
                  «
                </button>
              </li>

              {/* Previous button */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  ‹
                </button>
              </li>

              {/* Page number buttons */}
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

              {/* Next button */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  ›
                </button>
              </li>

              {/* Last Page button */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                  »
                </button>
              </li>

            </ul>
          </nav>

          {/* Showing X-Y of Z label */}
          <span className="text-muted small ms-3">
            Showing {startIndex + 1}–{Math.min(endIndex, product.length)} of {product.length}
          </span>

        </div>
      )}

    </div>
  )
}

export default Products