import styled from '@emotion/styled';
import {
  space,
  color,
  layout,
  flexbox,
  position,
  typography,
  border,
  background,
} from 'styled-system';

export const Box = styled.div`
  box-sizing: border-box;
  min-width: 0;
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${position}
  ${typography}
  ${border}
  ${background}
`;

export const FlexBox = styled(Box)`
  display: flex;
`;

export const FlexBoxColumn = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const GapFlexBox = styled(FlexBox)`
  gap: ${({ gap = "0" }) => gap};
`;

export const GapFlexBoxColumn = styled(FlexBoxColumn)`
  gap: ${({ gap = "0" }) => gap};
`;