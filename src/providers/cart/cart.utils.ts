import { Product } from '../../types/types';

export const addProductToCart = (cartProducts: Product[], cartProductToAdd: Product) => {
  const existingCartProduct = cartProducts!.find(
    (cartProduct: Product) => cartProduct.name! === cartProductToAdd.name!,
  );

  if (existingCartProduct) {
    return cartProducts.map((cartProduct: Product) =>
      cartProduct.name === cartProductToAdd.name
        ? {
            ...cartProduct,
            quantity: cartProduct.quantity! + 1,
            price: (cartProduct.price / cartProduct.quantity!) * (cartProduct.quantity! + 1),
          }
        : cartProduct,
    );
  }

  return [...(cartProducts as any), { ...cartProductToAdd, quantity: 1 }];
};

export const removeProductFromCart = (cartProducts: Product[], cartProductToRemove: Product) => {
  const existingCartProduct = cartProducts.find(
    (cartProduct: Product) => cartProduct.name === cartProductToRemove.name,
  );

  if (existingCartProduct!.quantity === 1) {
    return cartProducts.filter((cartProduct: Product) => cartProduct.name !== cartProductToRemove.name);
  }

  return cartProducts.map((cartProduct: Product) =>
    cartProduct.name === cartProductToRemove.name
      ? {
          ...cartProduct,
          quantity: cartProduct.quantity! - 1,
          price: (cartProduct.price / cartProduct.quantity!) * (cartProduct.quantity! - 1),
        }
      : cartProduct,
  );
};

export const sortProductsByCategory = (cartProducts: Product[], categorySortOrder: boolean) => {
  let sortedProducts = [...cartProducts];
  if (categorySortOrder) {
    sortedProducts.sort((a, b) => {
      if (a.category.id < b.category.id) {
        return -1;
      }
      if (a.category.id > b.category.id!) {
        return 1;
      }
      return 0;
    });
  } else {
    sortedProducts.sort((a, b) => {
      if (a.category.id > b.category.id) {
        return -1;
      }
      if (a.category.id < b.category.id!) {
        return 1;
      }
      return 0;
    });
  }
  return sortedProducts;
}

export const sortProductsByPrice = (cartProducts: Product[], priceSortOrder: boolean) => {
  let sortedProducts = [...cartProducts];
  if (priceSortOrder) {
    sortedProducts.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
  } else {
    sortedProducts.sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    });
  }
  return sortedProducts;
}

