import React, {Fragment} from 'react';

import SideBar from './SideBar/SideBar.component';
import RightSideBar from './RightSideBar/RightSideBar.component';
import Footer from "../Footer/Footer.component";

const LayoutWrapper = ({component: Component}) => {
  return class DefaultLayoutWrapper extends React.Component {
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
          <Footer/>
        </Fragment>
      );
    }
  };
};

export default LayoutWrapper;
