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
      <label key={ id } className="form-check-label" htmlFor={ name }>
        <input
          className="form-check-input"
          type="radio"
          id={ name }
          value={ id }
          name="categories"
          onClick={ onClick }
        />
        &nbsp;
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
        <span className="form-check-label">Categorias</span>
        { categories }
      </div>
    );
  }
}

Categories.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Categories;
