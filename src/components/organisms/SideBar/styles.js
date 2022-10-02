import styled from '@emotion/styled';
import { FlexBox, FlexBoxColumn } from '../../atoms/box.atom';

import { blue } from '../../../themes';

export const SidebarContainer = styled(FlexBoxColumn)`
  transition-duration: 300ms;
`

export const SidebarBox = styled(FlexBox)`
  &:hover {
    background-color: ${blue._50}26;
  }
`