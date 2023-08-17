import React, { useState } from 'react';
import { SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput, SearchbarLayout } from './Searchbar.styed';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = value.toLowerCase();
    onSubmit(text);
  }

  return (
    <SearchbarLayout className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <SearchFormButtonLabel className="button-label">Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          className="input"
          type="text"
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </SearchForm>
    </SearchbarLayout>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Searchbar;