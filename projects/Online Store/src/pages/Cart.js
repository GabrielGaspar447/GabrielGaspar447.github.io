import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      empty: true,
      cartList: undefined,
    };
  }

  componentDidMount() {
    this.retrieveLocalStorage();
  }

  retrieveLocalStorage = () => {
    if (!localStorage.cart || localStorage.cart === '[]') {
      this.setState({ empty: true });
      return;
    }

    const cart = JSON.parse(localStorage.cart);
    const cartList = cart.map(({ id, title, price, quantity, avlQty }) => (
      <div className="cart-item-container" key={ id }>
        <p data-testid="shopping-cart-product-name">{title}</p>
        <p>
          R$
          {price.toFixed(2)}
        </p>
        <span>Quantidade: </span>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ () => this.ChangeQty(id, '-') }
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">
          {quantity}
        </span>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ () => this.ChangeQty(id, '+') }
          disabled={ quantity === avlQty }
        >
          +
        </button>
        <button type="button" onClick={ () => this.ChangeQty(id, 'X') }>
          X
        </button>
      </div>
    ));

    this.setState({ empty: false, cartList });
  }

  ChangeQty = (id, operation) => {
    const cart = JSON.parse(localStorage.cart);
    const index = cart.findIndex((item) => item.id === id);

    if (operation === '+') {
      cart[index].quantity += 1;
    }
    if (operation === '-') {
      cart[index].quantity -= 1;
    }
    if (operation === 'X' || cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    localStorage.cart = JSON.stringify(cart);
    this.retrieveLocalStorage();
  }

  render() {
    const { empty, cartList } = this.state;
    return (
      <div className="cart-list-container">
        { empty ? (
          <span className="cart-empty-message" data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </span>)
          : (
            <>
              {cartList}
              <Link to="/checkout">
                <button
                  className="cart-checkout"
                  type="button"
                  data-testid="checkout-products"
                >
                  Finalizar compra
                </button>
              </Link>
            </>)}
      </div>
    );
  }
}
export default Cart;
