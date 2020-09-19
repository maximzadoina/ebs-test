import React, { useContext} from 'react';
import {CartContext} from '../../providers/cart/cart.provider'

import ProductsTable from '../../components/ProductsTable/ProductsTable.component'

const Homepage = () => {
    const {shopProducts}=useContext(CartContext)
    
  return (
    <div>
      <ProductsTable productsList={shopProducts}hasQuantity={false}/>
    </div>
  );
};
export default Homepage;
