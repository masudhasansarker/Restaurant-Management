import { createContext, useState, useMemo } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.name === item.name);
      if (existingItem) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Increment quantity
  const increment = (name) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity (remove if quantity goes to 0)
  const decrement = (name) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === name && item.quantity>1? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Total quantity of products
  const productQuantity = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  console.log('Total Quantity:', productQuantity);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        clearCart,
        productQuantity,
        increment,
        decrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
