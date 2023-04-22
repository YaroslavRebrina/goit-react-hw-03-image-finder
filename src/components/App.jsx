import React, { Component } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css';

export class App extends Component {

  render() {
    return (
      <div className={css.App}>
        <ImageGallery  />
      </div>
    );
  }
}
