import { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/api/products/').then(({ data }) => {
      setProducts(data);
    });
  }, []);
  

 
  
  return products;
};
