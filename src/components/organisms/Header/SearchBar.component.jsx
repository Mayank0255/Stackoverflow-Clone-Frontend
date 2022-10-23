import React from 'react';
import {useHistory} from 'react-router-dom';

import { FlexBox } from '../../atoms/box.atom';

import { blue } from '../../../themes';

import './Header.styles.scss';
import { SearchInput } from './styles';

const SearchBar = () => {
  let history = useHistory();

  return (
    <form
      id='search'
      onSubmit={() => history.push('/questions')}
      autoComplete='off'
    >
      <FlexBox
        bg={`${blue._50}26`}
        borderRadius='8px'
      >
        <SearchInput
          bg='transparent'
          color={blue._50}
          width='100%'
          autoComplete='off'
          type='text'
          name='search'
          placeholder='Search...'
        />
      </FlexBox>
    </form>
  )
}

export default SearchBar;