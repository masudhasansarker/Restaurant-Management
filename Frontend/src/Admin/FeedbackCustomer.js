import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './feedbackcustomer.css';

const FeedbackCustomer = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/feedback")
      .then(response => {
        setFeedback(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleDelete=async(id)=>{
   await axios.delete(`http://localhost:3001/feedback/${id}`)
   .then(res=>{
    alert(res.data);
    setFeedback(prevFeedback => prevFeedback.filter(item => item._id !== id));
   })
   .catch(err=>{
    alert(err.message);
   })
   console.log(id);
  }
  return (
    <div className="back">
      <div className="feedback-page">
      <h1>Customer Feedback</h1>
      <div className="feedback-grid">
        {feedback.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>No feedback available.</p>
        ) : (
          feedback.map((item, index) => (
            <div className="feedback-card" key={index}>
              <h3>{item.name}</h3>
              <p><strong>Email:</strong> {item.email}</p>
              <p>{item.feedbackMessage}</p>
              <button onClick={()=>handleDelete(item._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default FeedbackCustomer;
