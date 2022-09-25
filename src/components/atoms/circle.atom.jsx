import { Box } from './box.atom';
import styled from '@emotion/styled';

const Circle = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ radius = '5px' }) => `calc(${radius} * 2)`};
  width: ${({ radius = '5px' }) => `calc(${radius} * 2)`};
  border-radius: 50%;
  border: ${({ border = '0' }) => border};
  cursor: ${({ cursor = 'pointer' }) => cursor};
`;

export default Circle;
