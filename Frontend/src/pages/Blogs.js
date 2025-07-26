// Blogs.js
import React, { useEffect, useState, useContext } from 'react';
import "./Blogs.css";
import { useNavigate } from 'react-router';
import PageTitle from '../PageTitle/PageTitle';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { AuthContext } from '../AuthContex';
import { CartContext } from '../cartContex';

const Blogs = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [dessert, setDessert] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios.get("https://restaurant-management-ui5z.onrender.com/desserts")
      .then((response) => {
        setDessert(response.data);
        const initialQuantities = {};
        response.data.forEach(item => {
          initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue.trim());
  };

  // const handleQuantityChange = (id, type) => {
  //   setQuantities(prev => ({
  //     ...prev,
  //     [id]: Math.max(1, type === 'inc' ? prev[id] + 1 : prev[id] - 1)
  //   }));
  // };

  const handleAddToCart = (item) => {
    const qty = quantities[item._id] || 1;
    const cartData = {
      userName,
      type: "Dessert",
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      qty,
    };

    if (isLoggedIn) {
      addToCart(cartData);
      alert(`${item.name} added to cart`);
    } else {
      navigate("/login", {
        state: {
          redirectTo: "/blogs",
          cartItem: cartData
        }
      });
    }
  };

  const filteredDesserts = dessert.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blogs-page">
      <PageTitle title="Desserts" />
      <section className="search-section">
        <h1 className="section-title">Our Special Desserts</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search dessert by name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </section>

      <section className="dessert-list">
        {filteredDesserts.length > 0 ? (
          filteredDesserts.map((item) => (
            <div className="dessert-card" key={item._id}>
              <img src={item.imageUrl} alt={item.name} className="dessert-image" />
              <div className="dessert-info">
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>
                <p className="description">{item.description}</p>
              </div>

              <div className="dessert-bottom">
                {/* <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item._id, 'dec')}>−</button>
                  <span>{quantities[item._id]}</span>
                  <button onClick={() => handleQuantityChange(item._id, 'inc')}>+</button>
                </div> */}

                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No matching desserts found.</p>
        )}
      </section>
    </div>
  );
};

export default Blogs;
