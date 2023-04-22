import React from 'react';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ src, alt }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImg} src={src} alt={alt} />
    </li>
  );
};
