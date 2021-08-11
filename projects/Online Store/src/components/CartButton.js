import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiShoppingCart } from 'react-icons/fi';

class CartButton extends Component {
  render() {
    const { cartQuantity } = this.props;
    const magicNum = 10;
    const quantityClass = cartQuantity < magicNum ? 'cart-quantity-1' : 'cart-quantity-2';
    return (
      <Link className="cart-link" to="/cart">
        <FiShoppingCart className="cart-icon" />
        <span className={ quantityClass }>{ cartQuantity }</span>
      </Link>
    );
  }
}

CartButton.propTypes = {
  cartQuantity: PropTypes.number.isRequired,
};

export default CartButton;
