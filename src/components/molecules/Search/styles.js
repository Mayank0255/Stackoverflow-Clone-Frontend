import styled from '@emotion/styled';

import { blue } from '../../../themes';

export const SearchInput = styled.input`
  background: ${({ bg = 'transparent' }) => bg} !important;
  border: ${({ border = 'transparent' }) => border} !important;
  box-shadow: ${({ boxShadow = 'none' }) => boxShadow} !important;
  color: ${({ color = blue._50 }) => color} !important;
  width: ${({ width = '100%' }) => width} !important;
  font-weight: ${({ fontWeight = 500 }) => fontWeight} !important;
`