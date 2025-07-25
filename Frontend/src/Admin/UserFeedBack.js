import React, { useEffect, useState } from 'react';
import "./IndexAdmin.css";

const IndexAdmin = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Load feedbacks from localStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(storedData);
  }, []);

  // Delete handler
  const handleDelete = (indexToDelete) => {
    console.log(indexToDelete);
    const updatedFeedbacks = feedbacks.filter((_, index) => index !== indexToDelete);
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel - User Feedback</h1>
      {feedbacks.length > 0 ? (
        feedbacks.map((data, index) => (
          <div className="feedback-card" key={index}>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Message:</strong> {data.textarea}</p>
            <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))
      ) : (
        <p className="no-feedback">No feedback submitted yet.</p>
      )}
    </div>
  );
};

export default IndexAdmin;
