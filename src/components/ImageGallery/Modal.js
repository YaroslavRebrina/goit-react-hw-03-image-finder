import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ largeVerion, onClick }) => {
  return (
    <div onClick={() => onClick()} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeVerion} alt="big vesion" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeVerion: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
