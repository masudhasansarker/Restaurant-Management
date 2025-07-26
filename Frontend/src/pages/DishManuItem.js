import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import './DishManuItem.css';
import PageTitle from '../PageTitle/PageTitle';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { AuthContext } from '../AuthContex';
import { CartContext } from '../cartContex'; 

const DishManuItem = () => {
    const { isLoggedIn, userName } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
  const [dish, setDish] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    axios.get('https://restaurant-management-ui5z.onrender.com/dish')
      .then((response) => {
        setDish(response.data);
        const initialQuantities = {};
        response.data.forEach(item => {
          initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);
      });
      
  }, []);

  //handle add to cart
  // const handleAddToCart = (item) => {
  //   if (isLoggedIn) {
  //     // ✅ user logged in → navigate to cart
  //     navigate("/cart", {
  //       state: {userName: userName,type:"Dish", name: item.name, price: item.price }
  //     });
  //   } else {
  //     // ✅ user NOT logged in → navigate to login with redirect
  //     navigate("/login", {
  //       state: { redirectTo: "/cart", cartItem: {userName: userName,type:"Dish", name: item.name, price: item.price } }
  //     });
  //   }
  // }

// const handleQuantityChange = (id, type) => {
//     setQuantities(prev => ({
//       ...prev,
//       [id]: Math.max(1, type === 'inc' ? prev[id] + 1 : prev[id] - 1)
//     }));
//   };  
  const handleAddToCart = (item) => {
    const qty = quantities[item._id] || 1;
    const cartData = {
      userName,
      type: "Dish",
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
          redirectTo: "/dish",
          cartItem: cartData
        }
      });
    }
  };

  // Handle search button
  const handleSearchButton = (e) => {
    e.preventDefault();
    setSearchItem(inputValue.trim());
  };

  // Filter dishes
  const filteredDishes = dish.filter((data) =>
    data.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="blogs-page">
      <PageTitle title="Dish Menu" />
      <section className="search-section">
        <h1 className="section-title">Our Special Dishes</h1>
        <form className="search-form" onSubmit={handleSearchButton}>
          <input
            type="text"
            placeholder="Search dish by name..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </section>

      <section className="dish-list">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((data) => (
            <div className="dish-card" key={data._id}>
              <img src={data.imageUrl} alt={data.name} className="dish-image" />
              <div className="dish-info">
                <h3>{data.name}</h3>
                <p className="price">Price: ${data.price}</p>
                <p className="description">{data.description}</p>
              {/* <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(data._id, 'dec')}>−</button>
              <span>{quantities[data._id]}</span>
              <button onClick={() => handleQuantityChange(data._id, 'inc')}>+</button>
            </div> */}
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(data)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No matching dishes found.</p>
        )}
      </section>

    </div>
  );
};

export default DishManuItem;
