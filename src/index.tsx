import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CartProvider from './providers/cart/cart.provider'
ReactDOM.render(
    <BrowserRouter>
    <CartProvider>
      <App />
      </CartProvider>
    </BrowserRouter>
  ,
  document.getElementById('root'),
);
