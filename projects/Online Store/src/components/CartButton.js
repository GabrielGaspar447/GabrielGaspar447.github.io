import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CartButton extends Component {
  render() {
    const { cartQuantity } = this.props;
    return (
      <Link data-testid="shopping-cart-button" to="/cart">
        <button className="cart-button" type="button">
          <span role="img" aria-label="cart">🛒</span>
          <span data-testid="shopping-cart-size" className="cart-quantity">
            { cartQuantity }
          </span>
        </button>
      </Link>
    );
  }
}

CartButton.propTypes = {
  cartQuantity: PropTypes.number.isRequired,
};

export default CartButton;
