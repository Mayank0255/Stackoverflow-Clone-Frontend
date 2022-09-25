import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box, FlexBox } from '../../../atoms/box.atom';
import CustomIcon from '../../../molecules/CustomIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import IconLogo from '../../../../assets/IconLogo.svg';
import { blue, white, slate, neutral } from '../../../../themes';

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
