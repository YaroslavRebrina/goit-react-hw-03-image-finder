import React, { Component } from 'react';
import { SearchBar } from './ImageGallery/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';

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
      <div className={css.App}>
        <SearchBar getQuery={this.handlerInputChange} />
        <ImageGallery query={query} />
      </div>
    );
  }
}
