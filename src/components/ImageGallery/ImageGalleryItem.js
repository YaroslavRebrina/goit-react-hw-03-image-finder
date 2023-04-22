import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from './Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isOpened: false,
  };

  handlerOnClick = () => {
    this.setState(prevState => ({ isOpened: !prevState.isOpened }));
  };

  render() {
    const { src, alt, largeVerion } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          onClick={this.handlerOnClick}
          className={css.ImageGalleryItemImg}
          src={src}
          alt={alt}
        />
        {this.state.isOpened && (
          <Modal largeVerion={largeVerion} onClick={this.handlerOnClick} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  query: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};
