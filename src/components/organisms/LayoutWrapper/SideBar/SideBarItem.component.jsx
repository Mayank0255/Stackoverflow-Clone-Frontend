import React from 'react';
import { NavLink } from 'react-router-dom';

import { Box, FlexBox } from '../../../atoms/box.atom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { blue } from '../../../../themes';
import { SidebarBox } from './styles'

import './SideBar.styles.scss';

const SideBarItem = ({ link, icon, text, open }) => {
  return (
    <NavLink
      exact
      activeClassName='active'
      // className='home-link nav-link'
      to={link}
    >
      <SidebarBox
        py={2}
        mt={2}
        alignItems='center'
        borderRadius='6px'
        height='40px'
      >
        <FlexBox width='36px' justifyContent='center'>
          <FontAwesomeIcon
            icon={icon}
            color={blue._50}
            size='xl'
            // width='20px'
          />
        </FlexBox>
        <Box
          color={blue._50}
          fontWeight={600}
          fontSize='16px'
          ml={2}
          // ml={3}
          // visibility={open ? 'visible' : 'hidden'}
          display={open ? 'flex' : 'none'}
          style={{ transitionDuration: '300ms' }}
        >
          {text}
        </Box>
      </SidebarBox>
    </NavLink>
  )
};

export default SideBarItem;
