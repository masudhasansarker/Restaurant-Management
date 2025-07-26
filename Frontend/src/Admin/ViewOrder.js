import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './viewOrder.css';

const ViewOrder = () => {
  const [data, setData] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get("https://restaurant-management-ui5z.onrender.com/createOrder")
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  const handleSearch = () => {
    if (!searchDate) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(order =>
      order.createdAt?.slice(0, 10) === searchDate
    );
    setFilteredData(filtered);
  };

  const totalPrice = filteredData.reduce(
    (sum, order) => sum + parseFloat(order.price || 0), 0
  );

  return (
    <div className="view-order-container">
      <h1 className="header">View Order Lists</h1>

      <div className="search-bar">
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Food Type</th>
            <th>Food Name</th>
            <th>Price</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((order, index) => (
              <tr key={index}>
                <td>{order.createdAt?.slice(0, 10)}</td>
                <td>{order.customerName}</td>
                <td>{order.address}</td>
                <td>{order.type}</td>
                <td>{order.foodName}</td>
                <td>${order.price}</td>
                <td>{order.paymentMethod}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-orders">No orders found for this date.</td>
            </tr>
          )}
        </tbody>
      </table>

      {filteredData.length > 0 && (
        <div className="total-section">
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
