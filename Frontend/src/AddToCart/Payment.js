import React, { useContext, useState } from 'react';
import { CartContext } from '../cartContex';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './payment.css';

const Payment = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("Bkash");
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = async () => {
    try {
      await axios.post('https://restaurant-management-ui5z.onrender.com/order', {
        items: cartItems,
        total,
        paymentMethod,
        date: new Date()
      });
      clearCart();
      alert(`Order placed successfully via ${paymentMethod}!`);
      navigate('/');
    } catch (err) {
      alert("Failed to place order");
    }
  };
console.log(cartItems);
  return (
    <div className="payment-container">
      <h2 className="payment-title">🧾 Confirm Your Order</h2>

      <div className="order-summary">
        {cartItems.map((item, idx) => (
          <div key={idx} className="order-item">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="order-total">
          <strong>Total:</strong> ${total.toFixed(2)}
        </div>
      </div>

      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        {["Bkash", "Nagad", "Rocket", "Credit Card", "Cash on Delivery"].map((method) => (
          <label key={method}>
            <input
              type="radio"
              name="payment"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {method}
          </label>
        ))}
      </div>

      <button className="confirm-btn" onClick={handleConfirm}>
        Confirm and Pay
      </button>
    </div>
  );
};

export default Payment;
