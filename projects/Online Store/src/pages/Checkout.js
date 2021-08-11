import React, { Component } from 'react';
import BuyerData from '../components/BuyerData';

class Checkout extends Component {
  retrieveLocalStorage = () => {
    if (!localStorage.cart || localStorage.cart === '[]') return;

    const cart = JSON.parse(localStorage.cart);

    const reduce = cart.reduce((acc, { price, quantity }) => (
      acc + (parseFloat(price) * parseFloat(quantity))), 0);

    const cartList = cart.map(({ id, title, price, quantity }) => (
      <div key={ id }>
        <span>{title}</span>
        <span>{price}</span>
        <span>{quantity}</span>
      </div>
    ));
    return (
      <div>
        { cartList }
        { reduce.toFixed(2) }
      </div>
    );
  }

  render() {
    return (
      <>
        {this.retrieveLocalStorage()}
        <BuyerData />
      </>
    );
  }
}

export default Checkout;
