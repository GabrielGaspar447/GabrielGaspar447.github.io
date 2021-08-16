import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import './ImageSlide.css';

class ImageSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  nextImg = (pictures, index) => {
    const { length } = pictures;
    if (index === length - 1) {
      this.setState({ index: 0 });
    } else {
      this.setState((prevState) => ({ index: prevState.index + 1 }));
    }
  }

  prevImg = (pictures, index) => {
    const { length } = pictures;
    if (index === 0) {
      this.setState({ index: length - 1 });
    } else {
      this.setState((prevState) => ({ index: prevState.index - 1 }));
    }
  }

  render() {
    const { pictures } = this.props;
    const { index } = this.state;
    return (
      <div className="slide-container">
        { pictures.length > 1 ? (
          <>
            <MdNavigateBefore
              className="previous-image"
              onClick={ () => this.prevImg(pictures, index) }
            />
            <div className="picture-container">
              <img src={ pictures[index].url } alt="Product-Pic" />
            </div>
            <MdNavigateNext
              className="next-image"
              onClick={ () => this.nextImg(pictures, index) }
            />
          </>
        ) : (<img src={ pictures[index].url } alt="Product-Pic" />)}
      </div>
    );
  }
}

ImageSlide.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageSlide;
