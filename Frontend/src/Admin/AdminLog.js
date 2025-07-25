import React, { useState } from 'react';
import './adminLog.css'; 
import { useNavigate } from 'react-router';

const AdminLog = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.username==="admin"&& formData.password==="admin123"){
        navigate("/admin/home");
    }
    else{
        alert("admin information is not correct");
    }
    // // TODO: send to backend
    // console.log('Admin Login:', formData);
    // alert(`Username: ${formData.username}\nPassword: ${formData.password}`);
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default AdminLog;
