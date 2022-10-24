import React from 'react';
import { Route } from 'react-router-dom';

import RightSideBar from './components/organisms/RightSideBar/RightSideBar.component';

import usePageTitle from './hooks/usePageTitle';

export const PrivateRoute = ({ title, withRightSideBar = true, children, ...props }) => {
  usePageTitle(title);

  return (
    <Route {...props}>
      {children}
      {withRightSideBar && <RightSideBar/>}
    </Route>
  )
}
