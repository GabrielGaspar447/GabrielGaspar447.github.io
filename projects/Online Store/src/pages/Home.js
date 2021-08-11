import React, { Component } from 'react';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import * as api from '../services/api';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCat: undefined,
      itemList: undefined,
      cartQuantity: 0,
    };
  }

  componentDidMount() {
    this.CartQuantity();
  }

  CartQuantity = () => {
    if (!localStorage.cart || localStorage.cart === '[]') return;

    const cart = JSON.parse(localStorage.cart);

    const soma = cart.reduce((acc, { quantity }) => (
      acc + parseFloat(quantity)), 0);

    this.setState({ cartQuantity: soma });
  }

  RenderList = async () => {
    const { selectedCat } = this.state;
    const searchedProduct = document.querySelector('.search-bar').value;
    const json = await api.getProductsFromCategoryAndQuery(selectedCat, searchedProduct);

    const list = json.results.map((item) => (
      <ProductCard
        onClick={ this.CartQuantity }
        key={ item.id }
        item={ item }
        selCat={ selectedCat }
        query={ searchedProduct }
      />
    ));

    if (list.length === 0) {
      this.setState({ itemList: <span>Nenhum produto foi encontrado</span> });
    } else {
      this.setState({ itemList: list });
    }
  }

  SetCategory = () => {
    const selected = document.querySelector('input[name="categories"]:checked').value;
    this.setState({ selectedCat: selected }, () => this.RenderList());
  }

  render() {
    const { itemList, cartQuantity } = this.state;
    return (
      <div className="home">
        <Categories onClick={ this.SetCategory } />
        <main className="home-main">
          <header className="home-header">
            <input className="search-bar" type="text" data-testid="query-input" />
            <button data-testid="query-button" onClick={ this.RenderList } type="button">
              <span role="img" aria-label="lupa">🔎</span>
            </button>
            <CartButton cartQuantity={ cartQuantity } />
          </header>
          <div className="home-product-list">
            { !itemList ? (
              <span data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </span>)
              : itemList}
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
