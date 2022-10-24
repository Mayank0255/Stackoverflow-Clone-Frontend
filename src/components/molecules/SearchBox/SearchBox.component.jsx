import React from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FlexBox } from '../../atoms/box.atom';
import { blue } from '../../../themes';

import { SearchInput } from './styles';

const SearchBox = ({
  placeholder,
  value,
  name,
  handleSubmit,
  handleChange,
  pt,
  px,
  width,
}) => {
  return (
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
        maxLength='35'
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </FlexBox>
  )
};

export default SearchBox;
