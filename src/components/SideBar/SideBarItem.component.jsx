import React from 'react';
import { NavLink } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import './SideBar.styles.scss';

const SideBarItem = ({ link, icon, text }) => (
  <NavLink
    activeClassName='active'
    className='icon-link'
    to={link}
  >
    <ListItem disablePadding>
      <ListItemButton className='menu-list-btn'>
        <ListItemIcon className='menu-list-icon'>
          {icon}
        </ListItemIcon>
        <ListItemText className='menu-list-text' primary={text} />
      </ListItemButton>
    </ListItem>
  </NavLink>
);

export default SideBarItem;
