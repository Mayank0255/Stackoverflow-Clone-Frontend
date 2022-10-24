import React from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FlexBox } from '../../atoms/box.atom';
import { blue } from '../../../themes';

import { SearchInput } from './styles';

const SearchBox = ({
  formBg = `${blue._50}26`,
  value,
  handleSubmit,
  ...props
}) => {
  return (
    <FlexBox
      bg={formBg}
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
        {...props}
        autoComplete='off'
        type='text'
        value={value}
      />
    </FlexBox>
  )
};

export default SearchBox;
