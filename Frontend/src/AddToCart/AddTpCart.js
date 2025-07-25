import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import "./AddToCart.css";
import axios from 'axios';

const Cart = () => {
  const location = useLocation();
  const {name, price, userName,type } = location.state || {};
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState(null);

useEffect(() => {
  axios.get(`http://localhost:3001/getUser/${userName}`)
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.error("Error fetching user:", err);
    });
}, [userName]);  // add dependency array → avoids infinite loop
 console.log(user);
 const handlePayment = () => {
  if (paymentMethod === "") {
    alert("Please select a payment method.");
    return;
  }

  // Simulate payment processing
  setTimeout(() => {
    setPaymentSuccess(true);
//al the data are added here 
    const orderData = {
      customerName: user?.name,
      address: user?.address,
      type:type,
      foodName: name,
      price: price,
      paymentMethod: paymentMethod
    };

    axios.post("http://localhost:3001/createOrder", orderData)
      .then(res => {
        console.log(res.data);
        alert("✅ Order submitted successfully!");
      })
      .catch(err => {
        console.error("Error submitting order:", err);
        alert("❌ Failed to submit order.");
      });

  }, 1000);
};

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Payment</h2>
      {price ? (
        <div className="cart-item">
          <p>FoodType:{type}</p>
          <p><strong>Name:</strong>{name}</p>
          <p><strong>Price:</strong> ${price}</p>
          <p>{}</p>
          <div className="payment-section">
            <h3>Choose Payment Method:</h3>
            <select
              className="payment-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">-- Select Payment Method --</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Bkash">Bkash</option>
              <option value="Nagad">Nagad</option>
              <option value="Rocket">Rocket</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
            <button className="payment-btn" onClick={handlePayment}>Pay Now</button>
          </div>

          {paymentSuccess && <p className="payment-success">✅ Payment Successful {price} via {paymentMethod}!</p>}
        </div>
      ) : (
        <p className="no-item">No item added yet.</p>
      )}
    </div>
  );
};

export default Cart;
