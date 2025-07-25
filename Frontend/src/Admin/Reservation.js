import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './reservation.css';

const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  // Fetch reservations on component mount
  useEffect(() => {
    axios.get('http://localhost:3001/reservation')
      .then((response) => {
        setReservations(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Handle delete reservation
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      axios.delete(`http://localhost:3001/reservation/${id}`)
        .then((response) => {
          alert(response.data);
          // Remove deleted reservation from state
          setReservations((prevReservations) => prevReservations.filter(res => res._id !== id));
        })
        .catch((error) => {
          console.log(error.message);
          alert('Failed to delete reservation');
        });
    }
  };

  return (
    <div className="BackgroundDesign">
      <div className="reservation-page">
      <h1 className="reservation-title">Reservation List</h1>

      {reservations.length > 0 ? (
        <div className="reservation-grid">
          {reservations.map((res) => (
            <div className="reservation-card" key={res._id}>
              <h3>{res.name}</h3>
              <p><strong>Email:</strong> {res.email}</p>
              <p><strong>Phone:</strong> {res.phone}</p>
              <p><strong>Date:</strong> {res.date}</p>
              <p><strong>Time:</strong> {res.time}</p>
              <p><strong>Guests:</strong> {res.guests}</p>
              <p><strong>Message:</strong> {res.message || 'No message'}</p>
              <button onClick={() => handleDelete(res._id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-reservations">No reservations found.</p>
      )}
    </div>
    </div>
  );
};

export default Reservation;
