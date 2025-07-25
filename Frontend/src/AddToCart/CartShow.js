import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import './CartShow.css';
import { CartContext } from '../cartContex';

const CartShow = () => {
  const { cartItems, increment, decrement } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cartItems.length > 0 ? (
        cartItems.map((item, idx) => (
          <div className="cart-item" key={idx}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="cart-image"
            />
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <p>Type: {item.type}</p>
              <div className="productQuantity">
                <button onClick={() => decrement(item.name)}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => increment(item.name)}>+</button>
              </div>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="empty-cart">🧺 Your cart is currently empty.</p>
      )}

      <div className="total-section">
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      <div className="button-group">
        <button
          className="checkout-btn primary"
          onClick={() => navigate('/payment')}
        >
          Proceed to Payment 💳
        </button>
        <button
          className="checkout-btn secondary"
          onClick={() => navigate('/')}
        >
          Continue Shopping 🛍️
        </button>
      </div>
    </div>
  );
};

export default CartShow;
