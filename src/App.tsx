import React, { Component } from 'react';
import './scss/App.scss';
import shoppingcart from './res/shoppingcart.svg';
interface Category {
  id: string;
  name: string;
}
interface Product {
  name: string;
  price: number;
  category: Category;
}
interface addedProduct {
  product: Product;
  quant: number;
}
interface MyProps {};
interface MyState {
  products: Product[];
  ascendingPriceAllProducts: boolean;
  ascendingPriceAddedProducts: boolean;
  ascendingCategoryAllProducts: boolean;
  ascendingCategoryAddedProducts: boolean;
  shoppingcart: addedProduct[];
  hideShowShoppingCart: string;
  shoppingbagIsOpen: boolean;
}

export default class App extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      products: [],
      shoppingcart: [],
      ascendingPriceAllProducts: true,
      ascendingPriceAddedProducts: true,
      ascendingCategoryAllProducts: true,
      ascendingCategoryAddedProducts: true,
      hideShowShoppingCart: 'hideShoppingCart',
      shoppingbagIsOpen: false,
    };
  }

  async componentDidMount() {
    await fetch(`http://localhost:3001/api/products/`)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }))
      .catch((error) => console.log(' error:', error));
  }

  sortByPrice(allProductsList: boolean) {
    let allProducts: Product[] = this.state.products;
    let allAddedProducts: addedProduct[] = this.state.shoppingcart;

    if (allProductsList) {
      if (this.state.ascendingPriceAllProducts) {
        allProducts.sort((a, b) => a.price - b.price);
      } else {
        allProducts.sort((a, b) => b.price - a.price);
      }
      this.setState({
        ascendingPriceAllProducts: !this.state.ascendingPriceAllProducts,
        products: allProducts,
      });
    } else {
      if (this.state.ascendingPriceAddedProducts) {
        allAddedProducts.sort((a, b) => a.product.price * a.quant - b.product.price * b.quant);
      } else {
        allAddedProducts.sort((a, b) => b.product.price * b.quant - a.product.price * a.quant);
      }
      this.setState({
        ascendingPriceAddedProducts: !this.state.ascendingPriceAddedProducts,
        shoppingcart: allAddedProducts,
      });
    }
  }

  sortByCategory(allProductsList: boolean) {
    let allProducts: Product[] = this.state.products;
    let allAddedProducts: addedProduct[] = this.state.shoppingcart;

    if (allProductsList) {
      if (this.state.ascendingCategoryAllProducts) {
        allProducts.sort(function (a, b) {
          return a.category.name.localeCompare(b.category.name);
        });
      } else {
        allProducts.sort(function (a, b) {
          return b.category.name.localeCompare(a.category.name);
        });
      }
      this.setState({
        ascendingCategoryAllProducts: !this.state.ascendingCategoryAllProducts,
        products: allProducts,
      });
    } else {
      if (this.state.ascendingCategoryAddedProducts) {
        allAddedProducts.sort(function (a, b) {
          return a.product.category.name.localeCompare(b.product.category.name);
        });
      } else {
        allAddedProducts.sort(function (a, b) {
          return a.product.category.name.localeCompare(b.product.category.name);
        });
      }
      this.setState({
        ascendingPriceAddedProducts: !this.state.ascendingPriceAddedProducts,
        shoppingcart: allAddedProducts,
      });
    }

    this.setState({
      products: allProducts,
    });
  }

  showHideBag() {
    if (!this.state.shoppingbagIsOpen)
      this.setState({
        hideShowShoppingCart: 'showShoppingCart',
        shoppingbagIsOpen: true,
      });
    else {
      this.setState({
        hideShowShoppingCart: 'hideShoppingCart',
        shoppingbagIsOpen: false,
      });
    }
  }

  addNewProduct(product: Product) {
    let productsInCart: addedProduct[] = this.state.shoppingcart;
    let alreadyInCart = false;
    let k = 0;

    for (k; k < productsInCart.length; k++) {
      if (productsInCart[k].product === product) {
        alreadyInCart = true;
        break;
      }
    }
    if (alreadyInCart) {
      productsInCart[k].quant++;
    } else {
      let newProduct: addedProduct = {
        product: product,
        quant: 1,
      };
      productsInCart.push(newProduct);
    }

    this.setState({
      shoppingcart: productsInCart,
    });
  }

  removeProduct(product: Product) {
    let productsInCart: addedProduct[] = this.state.shoppingcart;
    let i: number = 0;
    let isInCart: boolean = false;
    if (productsInCart.length) {
      for (i; i < productsInCart.length; i++) {
        if (productsInCart[i].product === product) {
          isInCart = true;
          break;
        }
      }

      if (isInCart) {
        if (productsInCart[i].quant < 2) {
          productsInCart.splice(i, 1);
        } else {
          productsInCart[i].quant--;
        }
      }
    }
    this.setState({
      shoppingcart: productsInCart,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="navbar">
          <img onClick={this.showHideBag.bind(this)} className="shoppingcart" src={shoppingcart} alt="not found" />
        </div>
        {this.state.shoppingcart.length > 0 ? (
          <div className={this.state.hideShowShoppingCart}>
            <table className="shoppingbagTable">
              <tbody>
                <tr>
                  <th>
                    <button className="sortButtons" onClick={this.sortByCategory.bind(this, false)}>
                      Category
                    </button>
                  </th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>
                    <button className="sortButtons" onClick={this.sortByPrice.bind(this, false)}>
                      Price
                    </button>
                  </th>
                  <th>Actions</th>
                </tr>
                {this.state.shoppingcart.map((addedProduct, i) => {
                  return (
                    <tr key={i}>
                      <td>{addedProduct.product.category.name}</td>
                      <td>{addedProduct.product.name}</td>
                      <td>{addedProduct.quant}</td>
                      <td>{(Math.round(addedProduct.product.price * addedProduct.quant * 100) / 100).toFixed(2)}</td>
                      <td className="actionButtons">
                        <button
                          onClick={this.removeProduct.bind(this, addedProduct.product)}
                          className="actionBtnRemove"
                        >
                          Remove
                        </button>
                        <button onClick={this.addNewProduct.bind(this, addedProduct.product)} className="actionBtnAdd">
                          Add
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={`${this.state.hideShowShoppingCart} noProductsToDisplayTxt`}>
            There aren't any products inside your cart.
          </div>
        )}

        <table className="allProductsTable">
          <tbody>
            <tr>
              <th>
                <button className="sortButtons" onClick={this.sortByCategory.bind(this, true)}>
                  Category
                </button>
              </th>
              <th>Name</th>
              <th>
                <button className="sortButtons" onClick={this.sortByPrice.bind(this, true)}>
                  Price
                </button>
              </th>
              <th>Actions</th>
            </tr>
            {this.state.products.map((product, i) => {
              return (
                <tr key={i}>
                  <td>{product.category.name}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td className="actionButtons">
                    <button onClick={this.removeProduct.bind(this, product)} className="actionBtnRemove">
                      Remove
                    </button>
                    <button onClick={this.addNewProduct.bind(this, product)} className="actionBtnAdd">
                      Add
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
