import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import * as api from '../services/api';
import CartButton from '../components/CartButton';
import './Details.css';
import Reviews from '../components/Reviews';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: {},
      freeShipping: false,
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
    const { match: { params: { id } },
      location: { state: { selCat, query } } } = this.props;

    const json = await api.getProductsFromCategoryAndQuery(selCat, query);
    const product = json.results.find((item) => item.id === id);
    const freeShipping = product.shipping.free_shipping;
    const description = (await (await fetch(`https://api.mercadolibre.com/items/${id}/description`)).json()).plain_text;
    this.setState({ loading: false, product, freeShipping, description });
  }

  render() {
    const { loading, product, freeShipping, description, cartQuantity } = this.state;
    const { id, title, thumbnail, price,
      available_quantity: avlQty } = product;
    return (
      <div className="details-body">
        <header className="details-header">
          <Link to="/"><MdArrowBack className="details-back-arrow" /></Link>
          <CartButton cartQuantity={ cartQuantity } />
        </header>
        {!loading && (
          <>
            <div className="details-outercontainer">
              <div className="details-innercontainer">
                <div className="details-product-info">
                  <span>{ title }</span>
                  <img src={ thumbnail } alt={ title } />
                  <span>
                    R$
                    { price.toFixed(2) }
                  </span>
                  { freeShipping ? <span className="details-shipping">FRETE GRÁTIS</span>
                    : null}
                </div>
                <div className="details-product-description">
                  <p>{ description }</p>
                </div>
              </div>
              <button
                className="details-addToCart-btn"
                type="button"
                onClick={ () => this.AddToCart(id, title, price, avlQty) }
              >
                Adicionar ao carrinho
              </button>
            </div>
            <Reviews id={ id } />
          </>
        )}
      </div>
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
