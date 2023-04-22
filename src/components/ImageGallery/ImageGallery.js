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
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.query !== prevProps.query ||
      this.state.page !== prevState.page
    ) {
      const { query } = this.props;

      this.setState({ isLoading: true });

      if (query !== prevProps.query) {
        this.wipeCollection();
      }
      try {
        const { query } = this.props;
        const response = await fetchImgs(query, this.state.page);
        const imgCollection = response.data.hits;
        this.setState(prevState => {
          return {
            collection: [...prevState.collection, ...imgCollection],
            isLoading: false,
          };
        });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  wipeCollection = () => {
    this.setState(() => {
      return { collection: [], page: 1 };
    });
  };

  handlerPaginationButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { collection, isLoading, error } = this.state;
    console.log(isLoading);
    return (
      <>
        {error && <p>Что-то не так, попробуйте ещё раз...</p>}
        {isLoading && <Loader />}

        {collection.length > 0 && (
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
            {isLoading ? (
              <Loader />
            ) : (
              <Button
                disabled={isLoading}
                onClick={this.handlerPaginationButtonClick}
              />
            )}
          </>
        )}
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
