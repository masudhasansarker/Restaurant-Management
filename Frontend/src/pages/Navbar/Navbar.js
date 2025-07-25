// Navbar.js
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router';
import "./Navbar.css";
import { AuthContext } from '../../AuthContex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../cartContex';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const {productQuantity}=useContext(CartContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className='nav-design'>
      <nav>
  {/* <div className="nav-left">
    <img src="./img_bg_2.jpg" className="logo" alt="Logo" />
  </div> */}

  <div className="nav-center">
    <NavLink to='/' className="link-design">Home</NavLink>
    <NavLink to='/blogs' className="link-design">Dessert</NavLink>
    <NavLink to='/dish' className="link-design">Dish</NavLink>
    <NavLink to='/drink' className="link-design">Drink</NavLink>
    <NavLink to='/about' className="link-design">About</NavLink>
    <NavLink to='/contact' className="link-design">Contact</NavLink>
  </div>

  <div className="nav-right">
    <NavLink to='/cartShow' className="link-design">
      <FontAwesomeIcon icon={faShoppingCart} />
      <span>{productQuantity}</span>
    </NavLink>
    {!isLoggedIn ? (
      <NavLink to='/login' className="link-design">Login</NavLink>
    ) : (
      <button onClick={handleLogout} className="logout">Logout</button>
    )}
  </div>
</nav>

    </div>
  );
};

export default Navbar;
