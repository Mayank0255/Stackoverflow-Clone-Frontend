import React, {Fragment} from 'react';

import SideBar from '../SideBar/SideBar.component';
import RightSideBar from '../RightSideBar/RightSideBar.component';

const PageContainer = ({component: Component}) => {
  return class DefaultPageContainer extends React.Component {
    render() {
      return (
        <Fragment>
          <div className='page'>
            <SideBar />
            <div id='content'>
              <Component {...this.props} />
              <RightSideBar />
            </div>
          </div>
        </Fragment>
      );
    }
  };
};

export default PageContainer;
