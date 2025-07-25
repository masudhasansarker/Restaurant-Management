import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContex';
import { CartProvider } from './cartContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <CartProvider>
    <App />
  </CartProvider>
  </AuthProvider>
);
