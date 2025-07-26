import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import './DrinkManuItem.css';
import PageTitle from '../PageTitle/PageTitle';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { AuthContext } from '../AuthContex';
import { CartContext } from '../cartContex';

const DrinkManuItem = () => {
  const { isLoggedIn, userName } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [drink, setDrink] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://restaurant-management-ui5z.onrender.com/drink')
      .then((response) => {
        setDrink(response.data);
        const initialQuantities = {};
        response.data.forEach(item => {
          initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);
      });
  }, []);

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
      type: "Drink",
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
          redirectTo: "/drink",
          cartItem: cartData
        }
      });
    }
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    setSearchItem(inputValue.trim());
  };

  const filteredDrinks = drink.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="blogs-page">
      <PageTitle title="Drink Menu" />
      <section className="search-section">
        <h1 className="section-title">Our Special Drinks</h1>
        <form className="search-form" onSubmit={handleSearchButton}>
          <input
            type="text"
            placeholder="Search by drink name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </section>

      <section className="dish-list">
        {filteredDrinks.length > 0 ? (
          filteredDrinks.map((data) => (
            <div className="dish-card" key={data._id}>
              <img src={data.imageUrl} alt={data.name} className="dish-image" />

              <div className="dish-info">
                <h3>{data.name}</h3>
                <p className="price">${data.price}</p>
                <p className="description">{data.description}</p>
              </div>

              <div className="dish-bottom">
                {/* <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(data._id, 'dec')}>−</button>
                  <span>{quantities[data._id]}</span>
                  <button
                    onClick={() => handleQuantityChange(data._id, 'inc')}
                    disabled={quantities[data._id] >= 7}
                  >+</button>
                </div> */}

                <button className="add-to-cart" onClick={() => handleAddToCart(data)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No drinks found.</p>
        )}
      </section>
    </div>
  );
};

export default DrinkManuItem;
