import React, { Component } from 'react';
import { fetchImgs } from 'servises/api';

import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    collection: [],
    isLoading: false,
    error: false,
  };

  static page = 1;

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      const { query } = this.props;

      this.setState({ isLoading: true });

      if (query !== prevProps.query) {
        this.wipeCollection();
      }
      try {
        await this.handlerFetchImgs();
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  wipeCollection = () => {
    this.page = 1;
    this.setState(() => {
      return { collection: [] };
    });
  };

  handlerFetchImgs = async () => {
    const { query } = this.props;
    const response = await fetchImgs(query, this.page);
    const imgCollection = response.data.hits;
    this.setState(prevState => {
      return {
        collection: [...prevState.collection, ...imgCollection],
        isLoading: false,
      };
    });
  };

  handlerPaginationButtonClick = () => {
    this.page += 1;
    this.handlerFetchImgs();
  };

  render() {
    const { collection, isLoading, error } = this.state;

    if (isLoading === true) {
      return <Loader />;
    }

    if (error === true) {
      return <p>Что-то не так, попробуйте ещё раз...</p>;
    }

    if (collection.length > 0 && isLoading === false)
      return (
        <>
          <ul className={css.ImageGallery}>
            {collection.map(item => (
              <ImageGalleryItem
                key={item.id}
                src={item.webformatURL}
                alt={item.largeImageURL}
              />
            ))}
          </ul>
          <Button onClick={this.handlerPaginationButtonClick} />
        </>
      );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
  key: PropTypes.number,
  src: PropTypes.string,
  alt: PropTypes.string,
};
