import React from 'react';

import SearchBox from './SearchBox.component';

const SearchForm = ({ handleSubmit = () => {}, ...props }) => {
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete='off'
    >
      <SearchBox { ...props }/>
    </form>
  )
}

export default SearchForm;