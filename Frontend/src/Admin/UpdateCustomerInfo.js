import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import "./updateCustomerInfo.css"

const UpdateCustomerInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, username, email, address, password } = location.state;
console.log(id,name);
  // initialize form state with default values
  const [formData, setFormData] = useState({
    name: name,
    username: username,
    email: email,
    address: address,
    password: password
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://restaurant-management-ui5z.onrender.com/customer/${id}`, formData);
      alert(response.data);
      navigate('/admin/customer'); // navigate back after update
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  return (
    <div className="update-customer-page">
      <h1>Update Customer Information</h1>
      <form className="update-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
  
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
  
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
  
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
  
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
  
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
}
export default UpdateCustomerInfo;
