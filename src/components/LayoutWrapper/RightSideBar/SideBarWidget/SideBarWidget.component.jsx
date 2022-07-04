import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import { SideBarWidgetData } from "./SideBarWidgetData";

import './SideBarWidget.styles.scss';

const SideBarWidget = () => {
  return (
    <Fragment>
      <div className="s-sidebarwidget s-sidebarwidget__yellow s-anchors s-anchors__grayscale mb16" data-tracker="cb=1">
        <ul className="d-block p0 m0">
          {SideBarWidgetData.map(({ type, title, icon, link }, index) => {
            if (type === 'header') {
              return <WidgetHeader
                key={index}
                title={title}
              />
            } else {
              return <WidgetItem
                key={index}
                icon={icon}
                title={title}
                link={link}
              />
            }
          })}
        </ul>
      </div>
    </Fragment>
  );
};

const WidgetHeader = ({ title }) => (
  <div className="s-sidebarwidget--header s-sidebarwidget__small-bold-text fc-light d:fc-black-900 bb bbw1">
    {title}
  </div>
)

const WidgetItem = ({ icon, title, link }) => (
  <li className="s-sidebarwidget--item d-flex px16">
    <div className="flex--item1 fl-shrink0">
      {icon}
    </div>
    <div className="flex--item wmn0 ow-break-word">
      <a
        href={link}
        className="js-gps-track"
        data-ga={`[&quot;community bulletin board&quot;,&quot;The Overflow Blog&quot;,&quot;${link}&quot;,null,null]`}
        data-gps-track="communitybulletin.click({ priority: 1, position: 0 })">{title}</a>
    </div>
  </li>
)

export default SideBarWidget;
