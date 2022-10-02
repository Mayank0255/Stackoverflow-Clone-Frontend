import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import SideBarItem from "./SideBarItem.component";
import { SideBarData } from "./SideBarData";
import { FlexBoxColumn } from '../../atoms/box.atom';
import Circle from '../../atoms/circle.atom';

import { SidebarContainer } from './styles'
import { blue } from '../../../themes';

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <SidebarContainer
      position='relative'
      width={open ? "250px" : "68px"}
      minWidth={open ? "200px" : "68px"}
      bg={blue._1100}
      boxShadow='2px 4px 4px rgba(0, 0, 0, 0.25)'
    >
      <Circle
        radius='16px'
        position='absolute'
        top='45%'
        right='-16px'
        display='flex'
        bg={blue._100}
        transform={`rotate(${open ? 0 : 180}deg)`}
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faAngleLeft} color={blue._1100} size='lg'/>
      </Circle>
      <FlexBoxColumn
        py='24px'
        px='16px'
        height='100%'
        justifyContent='space-between'
      >
        <FlexBoxColumn>
          {SideBarData.map(({ link, icon, text}, index) => (
            <SideBarItem
              key={index}
              link={link}
              icon={icon}
              text={text}
              open={open}
            />
          ))}
        </FlexBoxColumn>

      </FlexBoxColumn>
    </SidebarContainer>
  )
};

export default SideBar;
