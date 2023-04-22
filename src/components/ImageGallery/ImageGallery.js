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
    status: 'idle',
    page: 1,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { page } = this.state;
  //   if (page === nextState.page) {
  //     console.log(nextState);
  //     return false;
  //   }
  // }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.query !== prevProps.query ||
      this.state.page !== prevState.page
    ) {
      const { query } = this.props;
      const { page } = this.state;
      this.setState({ status: 'pending' });

      if (query !== prevProps.query) {
        this.wipeCollection();
      }

      try {
        const response = await fetchImgs(query, page);
        const imgCollection = response.data.hits;
        this.setState(prevState => {
          return {
            collection: [...prevState.collection, ...imgCollection],
            status: 'idle',
          };
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      } finally {
        this.setState({ status: 'idle' });
      }
    }
  }

  wipeCollection = () => {
    this.setState(() => {
      return { collection: [], page: 1 };
    });
  };

  handlerPaginationButtonClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { collection, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <p>Что-то не так, попробуйте ещё раз...</p>;
    }

    if (collection.length > 0 && status === 'idle')
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
