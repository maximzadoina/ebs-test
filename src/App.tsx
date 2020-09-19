import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/header.component';
import Homepage from './pages/home/homepage.component';
import CartPage from './pages/cart/cart.component';
import './App.scss';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/cart" component={CartPage} />
      </Switch>
    </div>
  );
};
export default App;
