import React, { Component } from 'react';
import { fetchImgs, per_page } from 'servises/api';
import { SearchBar } from './Searchbar';
import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';

import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    query: '',
    collection: [],
    isLoading: false,
    error: false,
    page: 1,
    isShowButton: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });

      try {
        const { query, page } = this.state;
        const response = await fetchImgs(query, page);
        const imgCollection = response.data.hits;
        console.log(response);
        this.setState(prevState => {
          return {
            collection: [...prevState.collection, ...imgCollection],
            isLoading: false,
            isShowButton: page < Math.ceil(response.data.totalHits / per_page),
          };
        });
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handlerInputChange = input => {
    this.setState({ query: input, collection: [], isLoading: false, page: 1 });
  };

  handlerPaginationButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { collection, isLoading, error, isShowButton } = this.state;

    return (
      <>
        <SearchBar getQuery={this.handlerInputChange} />
        {error && <p>Что-то не так, попробуйте ещё раз...</p>}
        {isLoading && <Loader />}

        {collection.length > 0 && (
          <>
            <ul className={css.ImageGallery}>
              {collection.map(item => (
                <ImageGalleryItem
                  key={item.id}
                  src={item.webformatURL}
                  largeVerion={item.largeImageURL}
                />
              ))}
            </ul>
            {isLoading ? (
              <Loader />
            ) : (
              isShowButton && (
                <Button
                  disabled={isLoading}
                  onClick={this.handlerPaginationButtonClick}
                />
              )
            )}
          </>
        )}
      </>
    );
  }
}
