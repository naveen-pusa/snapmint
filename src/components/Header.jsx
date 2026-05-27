import React from "react";
import { FaSearch, FaRegUserCircle, FaBars } from "react-icons/fa";
import { HiOutlineBriefcase } from "react-icons/hi";
import { PiCubeLight } from "react-icons/pi";

const Header = ({
  search,
  setSearch,
  category,
  setCategory,
  categoryList,
  cartCount,
  onCartClick,
  onLogoClick,
}) => {

  // ← FIX: if categoryList is undefined on first render, use [] so .map never crashes
  const safeCategoryList = categoryList || []

  return (
    <>
      {/* ── TOP HEADER ── */}
      <div
        className="container-fluid"
        style={{ backgroundColor: "#eef8fa", padding: "15px 30px" }}
      >
        <div className="row align-items-center g-3">

          {/* LOGO */}
          <div
            className="col-lg-2"
            style={{ cursor: "pointer" }}
            onClick={onLogoClick}
          >
            <h1
              style={{ fontSize: "42px", fontWeight: "700", color: "#004851", margin: "0" }}
            >
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
              {safeCategoryList.map(cat => (   // ← uses safeCategoryList, never crashes
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

              {/* CART BUTTON */}
              <div className="position-relative" style={{ cursor: "pointer" }} onClick={onCartClick}>
                <button className="btn btn-dark px-3 py-2" style={{ borderRadius: "12px" }}>
                  🛒 Cart
                </button>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </div>

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
  );
};

export default Header;