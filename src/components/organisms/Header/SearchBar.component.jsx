import React from 'react';
import {useHistory} from 'react-router-dom';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FlexBox } from '../../atoms/box.atom';
import { blue } from '../../../themes';

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
        alignItems='center'
        pl='24px'
        pr='8px'
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color={blue._50}
          size='xl'
        />
        <SearchInput
          fontWeight={500}
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