import React from 'react';
import { withRouter } from 'react-router-dom';
import './header.styles.scss';
import { ReactComponent as CartIcon } from '../../assets/cart.svg';
import { ReactComponent as HomeIcon } from '../../assets/home.svg';

const Header = ({ history }: any) => {
  return (
    <div className="navbar">
      <HomeIcon className="homeIcon" onClick={() => history.push('/')} />
      <CartIcon className="cartIcon" onClick={() => history.push('/cart')} />
    </div>
  );
};

export default withRouter(Header);
