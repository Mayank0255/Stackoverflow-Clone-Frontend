import React from 'react';
import { Route } from 'react-router-dom';

import LayoutWrapper from './components/organisms/LayoutWrapper/LayoutWrapper.component';

import usePageTitle from './hooks/usePageTitle';

export const LayoutRoute = ({ title, children, ...props }) => {
  usePageTitle(title);

  return (
    <Route {...props}>
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </Route>
  )
}

export const BaseRoute = ({ title, children, ...props }) => {
  usePageTitle(title);

  return (
    <Route {...props}>
      {children}
    </Route>
  )
}
