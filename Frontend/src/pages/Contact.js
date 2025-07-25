import React, { useContext, useEffect, useState } from 'react';
import './Contact.css';
import PageTitle from '../PageTitle/PageTitle';
import { useFormik } from 'formik';
import axios from 'axios';
import { AuthContext } from "../AuthContex";

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const { userName } = useContext(AuthContext);

  const [userData, setUserData] = useState([]);

  const reservationFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '',
      message: ''
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('http://localhost:3001/reservation', values);
        setSubmitStatus('Reservation submitted successfully!');
        resetForm();
      } catch (err) {
        console.log(err.message);
        setSubmitStatus('Reservation submission failed. Please try again.');
      }
    },
  });

  const feedbackFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      feedbackMessage: ''
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('http://localhost:3001/feedback', values);
        setFeedbackStatus('Thank you for your feedback!');
        resetForm();
      } catch (err) {
        console.log(err.message);
        setFeedbackStatus('Feedback submission failed. Please try again.');
      }
    },
  });

  useEffect(() => {
    axios.get("http://localhost:3001/customer")
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  // Match logged-in user and set autofill data
  useEffect(() => {
    if (userData.length > 0 && userName) {
      const matchedUser = userData.find(user => user.username === userName);
      if (matchedUser) {
        reservationFormik.setValues(prev => ({
          ...prev,
          name: matchedUser.name || '',
          email: matchedUser.email || ''
        }));
        feedbackFormik.setValues(prev => ({
          ...prev,
          name: matchedUser.name || '',
          email: matchedUser.email || ''
        }));
      }
    }
  }, [userData, userName]); // ✅ re-run when data is ready

  return (
    <div className="contact-page">
      <PageTitle title="Contact Us / Make a Reservation" />

      <div className="contact-content">
        <h2 className='content-title'>Get In Touch With Us</h2>
        <p>Have a question, suggestion, or want to make a reservation? We'd love to hear from you!</p>

        <div className="contact-grid">
          {/* Reservation Form */}
          <form className="contact-form reservation-form" onSubmit={reservationFormik.handleSubmit}>
            <h3>Reservation Form</h3>
            <input type="text" name="name" placeholder="Your Name" value={reservationFormik.values.name} onChange={reservationFormik.handleChange} required />
            <input type="email" name="email" placeholder="Your Email" value={reservationFormik.values.email} onChange={reservationFormik.handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={reservationFormik.values.phone} onChange={reservationFormik.handleChange} required />
            <input type="date" name="date" value={reservationFormik.values.date} onChange={reservationFormik.handleChange} required />
            <input type="time" name="time" value={reservationFormik.values.time} onChange={reservationFormik.handleChange} required />
            <input type="number" name="guests" placeholder="Number of Guests" value={reservationFormik.values.guests} onChange={reservationFormik.handleChange} required min="1" />
            <textarea name="message" placeholder="Additional Message (optional)" rows="4" value={reservationFormik.values.message} onChange={reservationFormik.handleChange}></textarea>
            <button type="submit">Submit Reservation</button>
            {submitStatus && <p className="submit-status">{submitStatus}</p>}
          </form>

          {/* Contact Info + Feedback Form */}
          <div className="right-section">
            <div className="contact-info">
              <h3>Contact Details</h3>
              <p><strong>Address:</strong> uttara sector-10, model town, Dhaka City</p>
              <p><strong>Phone:</strong> (+880) 01719145071</p>
              <p><strong>Email:</strong> masudhasanantorsarker@gmail.com</p>
              <p><strong>Hours:</strong> Mon–Sun: 10:00 AM – 10:00 PM</p>
            </div>

            <form className="contact-form feedback-form" onSubmit={feedbackFormik.handleSubmit}>
              <h3>User Feedback</h3>
              <input type="text" name="name" placeholder="Your Name" value={feedbackFormik.values.name} onChange={feedbackFormik.handleChange} required />
              <input type="email" name="email" placeholder="Your Email" value={feedbackFormik.values.email} onChange={feedbackFormik.handleChange} required />
              <textarea name="feedbackMessage" placeholder="Your Feedback" rows="4" value={feedbackFormik.values.feedbackMessage} onChange={feedbackFormik.handleChange} required></textarea>
              <button type="submit">Send Feedback</button>
              {feedbackStatus && <p className="submit-status">{feedbackStatus}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
