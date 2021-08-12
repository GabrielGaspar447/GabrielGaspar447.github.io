import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';

class ProductCard extends Component {
  AddToCard = (id, title, price, avlQty) => {
    const product = { id, title, price, quantity: 1, avlQty };
    const { onClick } = this.props;

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
    onClick();
  }

  render() {
    const { item: { id, title, thumbnail, price,
      available_quantity: avlQty, shipping: { free_shipping: freeShipping } },
    selCat,
    query } = this.props;
    const magicNum = 67;
    const titulo = title.length > magicNum ? `${title.match(/.{1,67}/g)[0].trim()}...`
      : title;
    return (
      <div className="home-product-card">
        <p className="home-product-title">{ titulo }</p>
        <img src={ thumbnail } alt={ title } />
        <p>
          R$
          { price.toFixed(2) }
        </p>
        { !freeShipping ? null
          : <p className="home-shipping">FRETE GRÁTIS</p>}
        <Link to={ { pathname: `/details/${id}`, state: { selCat, query } } }>
          <button className="btn btn-info btn-sm" type="button">Ver detalhes</button>
        </Link>
        <button
          className="btn btn-success"
          type="button"
          onClick={ () => this.AddToCard(id, title, price, avlQty) }
        >
          <FaCartPlus className="home-add-cart-icon" />
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
    price: PropTypes.number,
    available_quantity: PropTypes.number,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  selCat: PropTypes.string,
  query: PropTypes.string.isRequired,
};

ProductCard.defaultProps = {
  selCat: '',
};

export default ProductCard;
