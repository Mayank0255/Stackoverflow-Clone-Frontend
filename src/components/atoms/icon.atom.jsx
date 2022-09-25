import styled from '@emotion/styled';
import {
  space,
  color,
  layout,
  position,
  typography,
  textAlign,
} from 'styled-system';

const Icon = styled.span`
  font-family: 'Wasabi';
  &:before {
    content: ${({ unicode }) => `'\\${unicode}'`};
  }
  ${space}
  ${color}
  ${layout}
  ${position}
  ${typography}
  ${textAlign}
`;

export default Icon;
