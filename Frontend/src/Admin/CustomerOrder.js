import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./customerOrder.css";

const CustomerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dailyTotal, setDailyTotal] = useState(0);

  useEffect(() => {
    axios.get('https://restaurant-management-ui5z.onrender.com/order')
      .then(res => {
        setOrders(res.data);
        setFilteredOrders(res.data);
        calculateTotal(res.data); // Initial total for all orders
      })
      .catch(err => console.error("Failed to fetch orders:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchDate) {
      setFilteredOrders(orders);
      calculateTotal(orders);
    } else {
      const filtered = orders.filter(order => {
        const orderDate = new Date(order.date).toISOString().split('T')[0];
        return orderDate === searchDate;
      });
      setFilteredOrders(filtered);
      calculateTotal(filtered);
    }
  };

  const calculateTotal = (orderList) => {
    const total = orderList.reduce((sum, order) => sum + order.total, 0);
    setDailyTotal(total);
  };

  return (
    <div className="admin-orders">
      <h2 className='header'>All Customer Orders</h2>

      {/* 🔍 Search by Date */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.type} - ({item.name} x{item.qty}) = ${item.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.paymentMethod}</td>
                <td>{new Date(order.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      <div className="daily-total">
        <strong>Total Amount on {searchDate || "All Dates"}:</strong> ${dailyTotal.toFixed(2)}
      </div>
    </div>
    
  );
};

export default CustomerOrder;
