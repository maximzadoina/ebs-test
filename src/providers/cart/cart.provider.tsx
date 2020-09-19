import React, { createContext, useState, useEffect } from 'react';
import { addProductToCart, removeProductFromCart, sortProductsByCategory, sortProductsByPrice } from './cart.utils';
import { Product } from '../../types/types';
const arr: Product[] = [];
const storage = window.localStorage;
let storedData: Product[] = [];

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartProducts: arr,
  setAllProducts: (products: Product[]) => {},
  addProduct: (product: Product) => {},
  removeProduct: (product: Product) => {},
  sortByCategoryCart: () => {},
  sortByPriceCart: () => {},
  shopProducts: arr,
  changeCategorySortOrderCart: () => {},
  changePriceSortOrderCart: () => {},
  sortByCategoryShop: () => {},
  changeCategorySortOrderShop: () => {},
  sortByPriceShop: () => {},
  changePriceSortOrderShop: () => {},
});

const CartProvider = ({ children }: any) => {
  const [hidden, setHidden] = useState(true);
  if (JSON.parse(storage.getItem('cartProducts')!)) {
    storedData = JSON.parse(storage.getItem('cartProducts')!);
  }
  const [cartProducts, setCartProducts] = useState(storedData);
  const [shopProducts, setShopProducts] = useState(arr);

  const [categorySortOrderCart, setCategorySortOrderCart] = useState(true);
  const [priceSortOrderCart, setPriceSortOrderCart] = useState(true);

  const [categorySortOrderShop, setCategorySortOrderShop] = useState(true);
  const [priceSortOrderShop, setPriceSortOrderShop] = useState(true);

  const setAllProducts = (Products: Product[]) => setShopProducts(Products);
  const addProduct = (Product: Product) => setCartProducts(addProductToCart(cartProducts, Product));
  const removeProduct = (Product: Product) => setCartProducts(removeProductFromCart(cartProducts, Product));
  const toggleHidden = () => setHidden(!hidden);

  const sortByCategoryCart = () => setCartProducts(sortProductsByCategory(cartProducts, categorySortOrderCart));
  const changeCategorySortOrderCart = () => setCategorySortOrderCart(!categorySortOrderCart);
  const sortByPriceCart = () => setCartProducts(sortProductsByPrice(cartProducts, priceSortOrderCart));
  const changePriceSortOrderCart = () => setPriceSortOrderCart(!priceSortOrderCart);

  const sortByCategoryShop = () => setShopProducts(sortProductsByCategory(shopProducts, categorySortOrderShop));
  const changeCategorySortOrderShop = () => setCategorySortOrderShop(!categorySortOrderShop);
  const sortByPriceShop = () => setShopProducts(sortProductsByPrice(shopProducts, priceSortOrderShop));
  const changePriceSortOrderShop = () => setPriceSortOrderShop(!priceSortOrderShop);

  useEffect(() => {
    storage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:3001/api/products/')
        .then((response) => response.json())
        .then((data) => setAllProducts(data));
    };

    fetchData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartProducts,
        addProduct,
        removeProduct,
        shopProducts,
        setAllProducts,
        sortByCategoryCart,
        sortByPriceCart,
        changeCategorySortOrderCart,
        changePriceSortOrderCart,
        sortByCategoryShop,
        changeCategorySortOrderShop,
        sortByPriceShop,
        changePriceSortOrderShop,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
