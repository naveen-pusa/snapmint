import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaRegUserCircle, FaBars, FaShoppingCart } from "react-icons/fa";
import { HiOutlineBriefcase } from "react-icons/hi";
import { PiCubeLight } from "react-icons/pi";
import Cart from "../pages/Cart";

const Header = ({
  search,
  setSearch,
  category,
  setCategory,
  categoryList,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onLogoClick,
}) => {

  const safeCartItems = cartItems || []
  const safeCategoryList = categoryList || []

  const [cartOpen, setCartOpen] = useState(false)
  const cartRef = useRef(null)

  // ── FIX: count unique products, not total qty ──
  // If you add same product 5 times → badge shows 1 (1 unique product)
  // If you add 3 different products → badge shows 3
  const cartCount = safeCartItems.length  // ← FIXED: was reduce(sum + qty) before

  // Close cart dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* ── TOP HEADER ── */}
      <div
        className="container-fluid"
        style={{ backgroundColor: "#eef8fa", padding: "15px 30px" }}
      >
        <div className="row align-items-center g-3">

          {/* LOGO */}
          <div className="col-lg-2" style={{ cursor: "pointer" }} onClick={onLogoClick}>
            <h1 style={{ fontSize: "42px", fontWeight: "700", color: "#004851", margin: "0" }}>
              snap
              <span style={{ color: "#63c7cf", fontWeight: "500" }}>mint</span>
            </h1>
          </div>

          {/* SEARCH BAR */}
          <div className="col-lg-4">
            <div className="position-relative">
              <input
                type="text"
                placeholder="Search for TV, Mobiles, Headphones & more"
                className="form-control"
                style={{ height: "52px", borderRadius: "12px", paddingRight: "50px" }}
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  setCategory('')
                }}
              />
              <FaSearch
                style={{
                  position: "absolute", right: "20px", top: "18px",
                  fontSize: "18px", color: "#004851", cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* CATEGORY DROPDOWN */}
          <div className="col-lg-2">
            <select
              className="form-select"
              style={{ height: "52px", borderRadius: "12px" }}
              value={category}
              onChange={e => {
                setCategory(e.target.value)
                setSearch('')
              }}
            >
              <option value="">All Categories</option>
              {safeCategoryList.map(cat => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* RIGHT SIDE ICONS */}
          <div className="col-lg-4">
            <div className="d-flex justify-content-end align-items-center gap-4">

              {/* FOR BUSINESS */}
              <div className="d-flex align-items-center gap-2">
                <HiOutlineBriefcase style={{ fontSize: "24px", color: "#63c7cf" }} />
                <span style={{ fontSize: "16px", color: "#004851", fontWeight: "500" }}>
                  For Business
                </span>
              </div>

              {/* PAY EMI */}
              <div className="d-flex align-items-center gap-2">
                <PiCubeLight style={{ fontSize: "24px", color: "#63c7cf" }} />
                <span style={{ fontSize: "16px", color: "#004851", fontWeight: "500" }}>
                  Pay EMI
                </span>
              </div>

              {/* SIGN UP */}
              <div className="d-flex align-items-center gap-2">
                <FaRegUserCircle style={{ fontSize: "24px", color: "#63c7cf" }} />
                <span style={{ fontSize: "16px", color: "#004851", fontWeight: "500" }}>
                  Sign-up
                </span>
              </div>

              {/* ── CART ICON WITH DROPDOWN ── */}
              <div className="position-relative" ref={cartRef}>

                {/* Cart Icon Button */}
                <div
                  className="d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setCartOpen(prev => !prev)}
                >
                  <div className="position-relative">
                    <FaShoppingCart style={{ fontSize: "26px", color: "#004851" }} />
                    {/* Badge — shows unique product count */}
                    {cartCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "10px" }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: "16px", color: "#004851", fontWeight: "500" }}>
                    Cart
                  </span>
                </div>

                {/* ── CART DROPDOWN PANEL ── */}
                {cartOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 16px)",
                      right: "0",
                      width: "360px",
                      backgroundColor: "#fff",
                      borderRadius: "16px",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                      zIndex: 9999,
                      border: "1px solid #e8e8e8",
                      overflow: "hidden",
                    }}
                  >
                    {/* Dropdown Header — shows unique product count */}
                    <div
                      className="d-flex justify-content-between align-items-center px-3 py-2"
                      style={{ borderBottom: "1px solid #eee", backgroundColor: "#f9f9f9" }}
                    >
                      <span className="fw-bold" style={{ color: "#004851" }}>
                        {/* ── FIX: "X products" not "X items" ── */}
                        🛒 My Cart {cartCount > 0 && `(${cartCount} ${cartCount === 1 ? 'product' : 'products'})`}
                      </span>
                      <button
                        className="btn btn-sm text-muted p-0"
                        onClick={() => setCartOpen(false)}
                        style={{ fontSize: "18px", lineHeight: 1 }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* Cart Component inside dropdown */}
                    <Cart
                      cartItems={safeCartItems}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemoveItem={onRemoveItem}
                      onClearCart={onClearCart}
                    />

                  </div>
                )}

              </div>
              {/* ── END CART ── */}

            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM NAVBAR ── */}
      <div
        className="container-fluid"
        style={{ borderBottom: "1px solid #ddd", padding: "12px 30px", backgroundColor: "white" }}
      >
        <div className="d-flex align-items-center gap-5 flex-wrap">

          <FaBars style={{ fontSize: "26px", cursor: "pointer", color: "#004851" }} />

          {["beauty", "groceries", "mens-shirts", "smartphones", "womens-jewellery", "fragrances", "skin-care", "sports-accessories"].map(cat => (
            <span
              key={cat}
              style={{
                fontWeight: "500",
                cursor: "pointer",
                color: category === cat ? "#2e8ca1" : "#1a1a1a",
                borderBottom: category === cat ? "2px solid #2e8ca1" : "none",
                paddingBottom: "2px",
                textTransform: "capitalize",
              }}
              onClick={() => {
                setCategory(cat)
                setSearch('')
              }}
            >
              {cat.replace(/-/g, ' ')}
            </span>
          ))}

        </div>
      </div>
    </>
  )
}

export default Header