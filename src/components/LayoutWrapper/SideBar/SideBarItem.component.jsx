import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import './SideBar.styles.scss';

const SideBarItem = ({ link, icon, text, isHome }) => {
  return (
    <Fragment>
      {isHome ?
        <HomeItem
          link={link}
          text={text}
        /> :
        <DefaultItem
          link={link}
          icon={icon}
          text={text}
        />
      }
    </Fragment>
  )
};

const HomeItem = ({ link, text }) => (
  <NavLink
    exact
    activeClassName='active'
    className='home-link'
    to={link}
  >
    <ListItem disablePadding>
      <ListItemButton style={{ paddingLeft: '8px' }}>
        <ListItemText className='menu-list-text' primary={text} />
      </ListItemButton>
    </ListItem>
  </NavLink>
)

const DefaultItem = ({ link, icon, text }) => (
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
        <ListItemText className='menu-list-text' primary={text}/>
      </ListItemButton>
    </ListItem>
  </NavLink>
)

SideBarItem.defaultProps = {
  isHome: false,
};

export default SideBarItem;
