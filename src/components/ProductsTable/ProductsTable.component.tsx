import React, { useContext } from 'react';
import { CartContext } from '../../providers/cart/cart.provider';

import { Product } from '../../types/types';

import './ProductsTable.styles.scss';

const ProductsTable = ({ productsList, hasQuantity }: any) => {
  const {
    addProduct,
    removeProduct,
    cartProducts,
    sortByCategoryCart,
    changeCategorySortOrderCart,
    changePriceSortOrderCart,
    sortByPriceCart,
    sortByPriceShop,
    changePriceSortOrderShop,
    changeCategorySortOrderShop,
    sortByCategoryShop,
  } = useContext(CartContext);

  const categorySort = () => {
    if (hasQuantity) {
      sortByCategoryCart();
      changeCategorySortOrderCart();
    } else {
      sortByCategoryShop();
      changeCategorySortOrderShop();
    }
  };

  const priceSort = () => {
    if (hasQuantity) {
      sortByPriceCart();
      changePriceSortOrderCart();
    }
    else{
        sortByPriceShop();
        changePriceSortOrderShop()
    }
  };
  return (
    <div>
      {productsList.length ? (
        <table>
          <thead>
            <tr>
              <th onClick={() => categorySort()} className="sort">
                Category
              </th>
              <th>Name</th>
              {hasQuantity ? <th>Quantity</th> : null}
              <th className="sort" onClick={() => priceSort()}>
                Price
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((product: Product) => {
              return (
                <tr key={product.name}>
                  <td>{product.category.name}</td>
                  <td>{product.name}</td>
                  {hasQuantity ? <td>{product.quantity}</td> : null}
                  <td>{product.price.toFixed(2)}</td>
                  <td>
                    <button onClick={() => addProduct(product)}>+</button>
                    <button
                      onClick={() => removeProduct(product)}
                      disabled={
                        cartProducts.find((cartProduct: Product) => cartProduct.name === product.name) ? false : true
                      }
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h3 className="noProductsText">There are no products inside the cart.</h3>
      )}
    </div>
  );
};
export default ProductsTable;
