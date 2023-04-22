import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    input: null,
  };

  handlerInputChange = e => {
    this.setState({ input: e.target.value });
  };

  sendQueryToApp = e => {
    e.preventDefault();
    const { getQuery } = this.props;
    const { input } = this.state;
    this.setState({ input: null });
    getQuery(input);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.sendQueryToApp}>
          <button type="submit" className={css.SearchFormButton}>
            <span className="button-label">Search</span>
          </button>

          <input
            name="query"
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            onChange={this.handlerInputChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  getQuery: PropTypes.func.isRequired,
};
