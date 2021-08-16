import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { FaCartPlus } from 'react-icons/fa';
import * as api from '../services/api';
import CartButton from '../components/CartButton';
import './Details.css';
import Reviews from '../components/Reviews';
import ImageSlide from '../components/ImageSlide';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as free from '../images/free.png';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: {},
      freeShipping: false,
      avlQty: undefined,
      description: '',
      cartQuantity: 0,
    };
  }

  componentDidMount() {
    this.GetDetails();
    this.CartQuantity();
  }

  AddToCart = (id, title, price, avlQty) => {
    const product = { id, title, price, quantity: 1, avlQty };

    if (localStorage.cart) {
      const cart = JSON.parse(localStorage.cart);
      const filteredCart = cart.filter((item) => {
        if (item.id === product.id) {
          product.quantity = item.quantity + 1;
          if (product.quantity > avlQty) {
            product.quantity = avlQty;
          }
          return false;
        }
        return true;
      });
      localStorage.cart = JSON.stringify([...filteredCart, product]);
    } else {
      localStorage.cart = JSON.stringify([product]);
    }
    this.CartQuantity();
  }

  CartQuantity = () => {
    if (!localStorage.cart || localStorage.cart === '[]') return;

    const cart = JSON.parse(localStorage.cart);

    const soma = cart.reduce((acc, { quantity }) => (
      acc + parseFloat(quantity)), 0);

    this.setState({ cartQuantity: soma });
  }

  GetDetails = async () => {
    const { match: { params: { id } } } = this.props;

    const product = await api.getProductById(id);
    const avlQty = product.available_quantity;
    const freeShipping = product.shipping.free_shipping;
    const description = (await api.getProductDescription(id)).plain_text;
    this.setState({ loading: false, product, avlQty, freeShipping, description });
  }

  render() {
    const { loading, product, avlQty, freeShipping,
      description, cartQuantity } = this.state;
    const { id, title, pictures, price } = product;
    console.log(pictures);
    return (
      <>
        <Header />
        <div className="details-body">
          <header className="details-header">
            <Link to="/"><MdArrowBack className="details-back-arrow" /></Link>
            <CartButton cartQuantity={ cartQuantity } />
          </header>
          {!loading && (
            <>
              <div className="details-container">
                <ImageSlide pictures={ pictures } />
                <div className="details-product-info">
                  <span>{ title }</span>
                  <span>
                    R$&nbsp;
                    { price.toFixed(2) }
                  </span>
                  { freeShipping ? <img
                    className="details-shipping"
                    src={ free }
                    alt="free"
                  />
                    : null}
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={ () => this.AddToCard(id, title, price, avlQty) }
                  >
                    <FaCartPlus className="home-add-cart-icon" />
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
              <div className="details-product-description">
                <p>{ description }</p>
              </div>
              <Reviews id={ id } />
            </>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      selCat: PropTypes.string,
      query: PropTypes.string,
    }),
  }).isRequired,
};

export default Details;
