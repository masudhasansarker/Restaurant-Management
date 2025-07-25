import React, { createContext, useContext } from 'react';
import './Home.css';
import { useNavigate } from 'react-router';
import { AuthContext } from '../AuthContex'; // ✅ import AuthContext

const Home = () => {
  const navigate = useNavigate();
  const {isLoggedIn}=useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="hero-content">
        <div className="text-section">
          <p className="welcome-msg">HELLO, NEW FRIEND!</p>
          <h1 className="hero-heading">Welcome Back <br /> to <span className="highlight">Flavors & Forks

</span></h1>
          <p className="hero-subtext">
           Where every bite is an unforgettable experience.
          </p>
          <div className="hero-buttons">
            <button className="btn reservation" onClick={() => navigate('/contact')} disabled={!isLoggedIn}>
              Reservation
            </button>
            <button className="btn open-menu" onClick={() => navigate('/blogs')} disabled={!isLoggedIn}>
              Open Menu
            </button>
          </div>
        </div>

        <div className="image-section">
          {/* <img src="/dessert-1.jpg" alt="Delicious food" className="hero-image" /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
