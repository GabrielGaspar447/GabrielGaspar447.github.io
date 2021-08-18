import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { MdArrowBack } from 'react-icons/md';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
    const cartList = cart.map(({ id, title, price, thumbnail, quantity, avlQty }) => {
      const magicNum = 65;
      const titulo = title.length > magicNum ? `${title.match(/.{1,58}/g)[0].trim()}...`
        : title;
      return (
        <div className="cart-item-container" key={ id }>
          <img className="cart-img" src={ thumbnail } alt="product-thumbnail" />
          <div className="cart-item-info">
            <p>{ titulo }</p>
            <p>
              R$
              {price.toFixed(2)}
            </p>
            <span>Quantidade: </span>
            <button type="button" onClick={ () => this.ChangeQty(id, '-') }>
              <FiMinus />
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={ () => this.ChangeQty(id, '+') }
              disabled={ quantity === avlQty }
            >
              <FiPlus />
            </button>
            <button type="button" onClick={ () => this.ChangeQty(id, 'X') }>
              <FiX />
            </button>
          </div>
        </div>
      );
    });

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
      <div className="cart">
        <Header />
        <Link to="/"><MdArrowBack className="cart-back-arrow" /></Link>
        <div className="cart-list-container">
          { empty ? <span className="cart-empty-message">Seu carrinho está vazio</span>
            : (
              <>
                {cartList}
                <Link to="/checkout">
                  <button className="cart-checkout btn btn-primary" type="button">
                    Finalizar compra
                  </button>
                </Link>
              </>
            )}
        </div>
        <Footer />
      </div>
    );
  }
}
export default Cart;
