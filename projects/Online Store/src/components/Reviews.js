import React, { Component } from 'react';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starValue: '',
      reviewList: undefined,
      message: '',
      email: '',
    };
  }

  componentDidMount() {
    this.RenderReviews();
  }

  UpdateState = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  GetStarValue = (evt, value) => {
    this.setState({ starValue: value });
  }

  SaveReview = () => {
    const { starValue, email, message } = this.state;
    const { id } = this.props;

    const rating = starValue;

    const review = { email, rating, message };

    if (localStorage[id]) {
      const reviewArray = JSON.parse(localStorage[id]);
      const filteredReviews = reviewArray.filter((r) => {
        if (r.email === review.id) {
          return false;
        }
        return true;
      });
      localStorage[id] = JSON.stringify([...filteredReviews, review]);
    } else {
      localStorage[id] = JSON.stringify([review]);
    }

    this.setState({ email: '', message: '' });

    this.RenderReviews();
  }

  RenderReviews = () => {
    const { id } = this.props;

    if (!localStorage[id] || localStorage[id] === '[]') return;

    const reviews = JSON.parse(localStorage[id]);

    const reviewList = reviews.map((r) => (
      <div className="review-container" key={ r.email }>
        <span className="review-email">{ r.email }</span>
        <Rating className="review-rating" readOnly="true" value={ r.rating } />
        <p className="review-message">{ r.message }</p>
      </div>
    ));

    this.setState({ reviewList });
  }

  render() {
    const { reviewList, message, email } = this.state;
    return (
      <>
        <div className="revForm-container">
          <h3>Avalicações</h3>
          <form className="revForm-form">
            <input
              className="revForm-email form-control"
              name="email"
              type="email"
              placeholder="Email"
              value={ email }
              onChange={ this.UpdateState }
              required
            />
            <Rating
              className="revForm-Rating"
              name="rating"
              onChange={ this.GetStarValue }
              required
            />
            <textarea
              className="revForm-message form-control"
              name="message"
              id="review"
              cols="30"
              rows="10"
              placeholder="Mensagem (opcional)"
              onChange={ this.UpdateState }
              value={ message }
            />
            <button
              className="revForm-button btn btn-secondary"
              type="button"
              onClick={ this.SaveReview }
            >
              Avaliar
            </button>
          </form>
        </div>
        <div className="reviews-container">
          { !reviewList ? <span>Sem Avaliações</span>
            : reviewList }
        </div>
      </>
    );
  }
}

Reviews.propTypes = {
  id: PropTypes.string,
};

Reviews.defaultProps = {
  id: '',
};

export default Reviews;
