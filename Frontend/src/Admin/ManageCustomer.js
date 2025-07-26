import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './manageCustomer.css';
import { useNavigate } from 'react-router';

const ManageCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    axios.get("https://restaurant-management-ui5z.onrender.com/customer")
      .then(response => {
        setCustomer(response.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://restaurant-management-ui5z.onrender.com/customer/${id}`);
      alert(response.data);
      // Remove deleted customer from the state
      setCustomer(customer.filter(c => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="manage-customer-page">
      <h1>Manage Customers</h1>
      {customer.length === 0 ? (
        <p className="no-data">No customers found.</p>
      ) : (
        <div className="table-container">
          <table className="customer-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customer.map((c, index) => (
                <tr key={c._id || index}>
                  <td>{index + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.username}</td>
                  <td>{c.email}</td>
                  <td>{c.address}</td>
                  <td>{c.password}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="update-btn" onClick={()=>navigate("/admin/updateCustomerInfo",{ state: {id:c._id,name:c.name,username:c.username,email:c.email,address:c.address,password:c.password}})}>Update</button>
                      <button className="delete-btn" onClick={() => handleDelete(c._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCustomer;
