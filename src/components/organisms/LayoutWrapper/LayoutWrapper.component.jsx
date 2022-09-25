import React, {Fragment} from 'react';

import SideBar from './SideBar/SideBar.component';
import RightSideBar from './RightSideBar/RightSideBar.component';
import Footer from "../Footer/Footer.component";
import { Box, FlexBox, FlexBoxColumn } from '../../atoms/box.atom';

const LayoutWrapper = ({ children }) => {
  return (
    <FlexBox height={`calc(100vh - 80px)`}>
      <SideBar/>
      <Box flex='1 1 0%'>
        {children}
        <RightSideBar />
      </Box>
    </FlexBox>
  );
};

export default LayoutWrapper;
