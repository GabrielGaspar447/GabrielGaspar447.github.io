import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import CartButton from '../components/CartButton';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import * as api from '../services/api';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCat: undefined,
      loading: undefined,
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

  RenderList = async (evt = { type: 'click' }) => {
    const magicNum = 13;
    if (evt.type === 'click' || evt.keyCode === magicNum) {
      this.setState({ loading: true });
      const { selectedCat } = this.state;
      const query = document.querySelector('.search-bar').value;
      const json = await api.getProductsFromCategoryAndQuery(selectedCat, query);

      const list = json.results.map((item) => (
        <ProductCard
          onClick={ this.CartQuantity }
          key={ item.id }
          item={ item }
          selCat={ selectedCat }
          query={ query }
        />
      ));

      if (list.length === 0) {
        this.setState({ itemList: <p>Nenhum produto encontrado</p>, loading: false });
      } else {
        this.setState({ itemList: list, loading: false });
      }
    }
  }

  SetCategory = () => {
    const selected = document.querySelector('input[name="categories"]:checked').value;
    this.setState({ selectedCat: selected }, () => this.RenderList());
  }

  render() {
    const { itemList, loading, cartQuantity } = this.state;
    return (
      <>
        <Header />
        <div className="home">
          <Categories onClick={ this.SetCategory } />
          <main className="home-main">
            <header className="home-header">
              <input
                className="search-bar form-control"
                type="text"
                placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
                onKeyDown={ this.RenderList }
              />
              <FcSearch className="home-search-icon" onClick={ this.RenderList } />
              <CartButton cartQuantity={ cartQuantity } />
            </header>
            <div className="home-product-list">
              { loading ? <p>Buscando produtos...</p> : itemList }
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
