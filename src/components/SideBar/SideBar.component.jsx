import React from 'react';
import { NavLink } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { ReactComponent as GlobalIcon } from '../../assets/Globe.svg';

import './SideBar.styles.scss';

const SideBar = () => (
  <div className='side-bar-container'>
    <div className='side-bar-tabs'>
      <NavLink
        exact
        activeClassName='active'
        className='home-link'
        to='/'
      >
        <ListItem disablePadding>
          <ListItemButton style={{ paddingLeft: '8px' }}>
            <ListItemText className='menu-list-text' primary="Home" />
          </ListItemButton>
        </ListItem>
      </NavLink>

      <div className='public-tabs'>
        <p className='title fc-light'>PUBLIC</p>
        <NavLink
          activeClassName='active'
          className='icon-link'
          to='/questions'
        >
          <ListItem disablePadding>
            <ListItemButton className='menu-list-btn'>
              <ListItemIcon className='menu-list-icon'>
                <GlobalIcon className='icon' />
              </ListItemIcon>
              <ListItemText className='menu-list-text' primary="Stack Overflow" style={{ margin: '0' }}/>
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink activeClassName='active' className='link icon-link' to='/tags'>
          <ListItem disablePadding>
            <ListItemButton className='menu-list-btn'>
              <ListItemIcon className='menu-list-icon'/>
              <ListItemText className='menu-list-text' primary="Tags" />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink activeClassName='active' className='link icon-link' to='/users'>
          <ListItem disablePadding>
            <ListItemButton className='menu-list-btn'>
              <ListItemIcon className='menu-list-icon'/>
              <ListItemText className='menu-list-text' primary="Users" />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink activeClassName='active' className='link icon-link' to='/jobs'>
          <ListItem disablePadding>
            <ListItemButton className='menu-list-btn'>
              <ListItemIcon className='menu-list-icon'/>
              <ListItemText className='menu-list-text' primary="Jobs" />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </div>
      <div className='teams-tabs'>
        <p className='title fc-light'>TEAMS</p>
      </div>
    </div>
  </div>
);

export default SideBar;
