import React, { useEffect, useState } from 'react';
import "./adminHome.css";
import axios from 'axios';

const IndexAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [dailySummary, setDailySummary] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredSummary, setFilteredSummary] = useState([]);
  const [rangeTotals, setRangeTotals] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/order')
      .then(res => {
        setOrders(res.data);
        const result = processDailyReport(res.data);
        setDailySummary(result);
        setFilteredSummary(result);
      })
      .catch(err => console.error("Failed to fetch orders:", err));
  }, []);

  const processDailyReport = (orders) => {
    const summary = {};

    orders.forEach(order => {
      const date = new Date(order.date).toISOString().split('T')[0];

      if (!summary[date]) {
        summary[date] = {
          date,
          desserts: 0,
          dishes: 0,
          drinks: 0,
          totalAmount: 0,
        };
      }

      order.items.forEach(item => {
        const type = item.type.toLowerCase();
        if (type === 'dessert') summary[date].desserts += item.qty;
        else if (type === 'dish') summary[date].dishes += item.qty;
        else if (type === 'drink') summary[date].drinks += item.qty;

        summary[date].totalAmount += item.price * item.qty;
      });
    });

    return Object.values(summary).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const handleFilter = () => {
    if (!fromDate || !toDate) return;

    const filtered = dailySummary.filter(item => {
      return item.date >= fromDate && item.date <= toDate;
    });

    setFilteredSummary(filtered);

    // Calculate totals
    const total = {
      desserts: 0,
      dishes: 0,
      drinks: 0,
      totalAmount: 0,
    };

    filtered.forEach(day => {
      total.desserts += day.desserts;
      total.dishes += day.dishes;
      total.drinks += day.drinks;
      total.totalAmount += day.totalAmount;
    });

    setRangeTotals(total);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="/admin/home">Dashboard</a></li>
          <li><a href="/admin/customer">Manage Customers</a></li>
          <li><a href="/admin/addfood">Manage Food</a></li>
          <li><a href="/admin/orders">View Orders</a></li>
          <li><a href="/admin/reservation">Manage Reservation</a></li>
          <li><a href="/admin/feedback">Customers Feedback</a></li>
          <li><a href="/admin">Logout</a></li>
        </ul>
      </div>

      <div className="maina">
        <h1>Welcome, Admin!</h1>
        <h2 className="report-title">Daily Sales Report</h2>

        <div className="filter-box">
          <label>
            From: <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </label>
          <label>
            To: <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </label>
          <button onClick={handleFilter}>Search</button>
        </div>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Desserts Sold</th>
              <th>Dishes Sold</th>
              <th>Drinks Sold</th>
              <th>Total Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {filteredSummary.length === 0 ? (
              <tr><td colSpan="5">No data available</td></tr>
            ) : (
              filteredSummary.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.date}</td>
                  <td>{item.desserts}</td>
                  <td>{item.dishes}</td>
                  <td>{item.drinks}</td>
                  <td>${item.totalAmount.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {rangeTotals && (
          <div className="totals-box">
            <h3>Total in Selected Range:</h3>
            <p><strong>Desserts:</strong> {rangeTotals.desserts}</p>
            <p><strong>Dishes:</strong> {rangeTotals.dishes}</p>
            <p><strong>Drinks:</strong> {rangeTotals.drinks}</p>
            <p><strong>Total Amount:</strong> ${rangeTotals.totalAmount.toFixed(2)}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default IndexAdmin;
