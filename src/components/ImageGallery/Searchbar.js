import React, { Component } from 'react';

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

    getQuery(input);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.sendQueryToApp}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
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
