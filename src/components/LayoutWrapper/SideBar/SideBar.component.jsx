import React from 'react';
import { NavLink } from 'react-router-dom';

import { ListItem, ListItemButton, ListItemText } from '@mui/material';

import SideBarItem from "./SideBarItem.component";
import { ReactComponent as GlobalIcon } from '../../../assets/Globe.svg';

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
        <SideBarItem link='/questions' icon={<GlobalIcon className='icon' />} text='Stack Overflow'/>
        <SideBarItem link='/tags' text='Tags'/>
        <SideBarItem link='/users' text='Users'/>
        <SideBarItem link='/jobs' text='Jobs'/>
      </div>
      <div className='teams-tabs'>
        <p className='title fc-light'>TEAMS</p>
      </div>
    </div>
  </div>
);

export default SideBar;
