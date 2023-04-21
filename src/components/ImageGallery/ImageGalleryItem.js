import React from 'react';

export const ImageGalleryItem = ({ src, alt }) => {
  return (
    <li className="gallery-item">
      <img src={src} alt={alt} />
    </li>
  );
};
