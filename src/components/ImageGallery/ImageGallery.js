import React, { Component } from 'react';
import { fetchImgs } from 'servises/api';

import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';

import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    collection: [],
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.query !== prevProps.query ||
      this.state.page !== prevState.page
    ) {
      const { query } = this.props;
      const { page } = this.state;

      this.setState({ status: 'pending' });
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

  handlerPaginationButtonClick = () => {
    this.setState(prevState => {
      console.log(prevState.page);
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

    if (collection && status === 'idle')
      return (
        <>
          <ul className="gallery">
            {collection.map(item => (
              <ImageGalleryItem
                key={item.id}
                src={item.webformatURL}
                alt={item.largeImageURL}
              />
            ))}
          </ul>
          <div>
            <Button onClick={this.handlerPaginationButtonClick} />
          </div>
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
