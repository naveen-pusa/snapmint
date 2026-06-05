import React from 'react'

function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {

  const total =  cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      {cartItems.length === 0 ? (

        /* ── EMPTY STATE ── */
        <div className="text-center py-4 px-3">
          <div  style={{ fontSize: '48px' }}>🛒</div>
          <h6  className="fw-bold mt-2">Your cart is empty</h6>
          <p className="text-muted small">Add some products!</p>
        </div>

      ) : (
        <div>

          {/* ── CART ITEMS LIST ── */}
          <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
            {cartItems.map(item => (
              <div
                key={item.id}
                className="d-flex align-items-center gap-2 p-2 border-bottom"
              >
                {/* Product Image */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{ width: '55px', height: '55px', objectFit: 'contain', background: '#f5f5f5', borderRadius: '8px', padding: '4px' }}
                />

                {/* Product Info */}
                <div className="flex-grow-1">
                  <p className="mb-0 fw-bold small" style={{ fontSize: '13px', lineHeight: '1.3' }}>
                    {item.title.slice(0, 28)}...
                  </p>
                  <p className="mb-1 text-muted" style={{ fontSize: '12px' }}>
                    ${item.price} each
                  </p>

                  {/* Quantity Controls */}
                  <div className="d-flex align-items-center gap-1">
                    <button
                      className="btn btn-outline-secondary btn-sm py-0 px-2"
                      style={{ fontSize: '16px', lineHeight: '1.4' }}
                      onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
                    >
                      −
                    </button>
                    <span className="fw-bold px-2" style={{ fontSize: '14px' }}>{item.qty}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm py-0 px-2"
                      style={{ fontSize: '16px', lineHeight: '1.4' }}
                      onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Item Total + Remove */}
                <div className="text-end">
                  <p className="fw-bold mb-1 small">${(item.price * item.qty).toFixed(2)}</p>
                  <button
                    className="btn btn-sm text-danger p-0"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove"
                  >
                    🗑
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* ── FOOTER: TOTAL + BUTTONS ── */}
          <div className="p-3">

            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="btn btn-dark w-100 mb-2">
              Proceed to Checkout →
            </button>

            <button
              className="btn btn-outline-danger w-100 btn-sm"
              onClick={onClearCart}
            >
              🗑 Clear Cart
            </button>

          </div>

        </div>
      )}
    </>
  )
}

export default Cart