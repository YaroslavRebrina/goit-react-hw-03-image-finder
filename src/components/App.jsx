import React, { Component } from 'react';
import { SearchBar } from './ImageGallery/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: null,
  };

  handlerInputChange = input => {
    this.setState({ query: input });
  };

  render() {
    const { query } = this.state;

    return (
      <>
        <SearchBar getQuery={this.handlerInputChange} />
        <ImageGallery query={query} />
      </>
    );
  }
}
