import React, {Fragment} from 'react';
import Helmet from 'react-helmet';

const usePageTitle = ({ component: Component, title }) => {
  let defaultTitle = 'CLONE Stack Overflow - Where Developers Learn, Share, & Build Careers';

  return class Title extends React.Component {
    render() {
      return (
        <Fragment>
          <Helmet>
            <title>{title ? title : defaultTitle}</title>
          </Helmet>
          <Component {...this.props} />
        </Fragment>
      );
    }
  };
};

export default usePageTitle;
