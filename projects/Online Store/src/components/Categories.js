import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const { onClick } = this.props;
    const json = await api.getCategories();
    const categories = json.map(({ name, id }) => (
      <label data-testid="category" key={ id } htmlFor={ name }>
        <input
          type="radio"
          id={ name }
          value={ id }
          name="categories"
          onClick={ onClick }
        />
        {name}
      </label>
    ));
    this.setState({ loading: false, categories });
  }

  render() {
    const { loading, categories } = this.state;
    if (loading) return <div>Loading...</div>;
    return (
      <div className="home-categories">
        <span>Categorias</span>
        { categories }
      </div>
    );
  }
}

Categories.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Categories;
