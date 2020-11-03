import React from 'react';
import Helmet from 'react-helmet';

const PageTitle = ({ title }) => {
    let defaultTitle = 'CLONE Stack Overflow - Where Developers Learn, Share, & Build Careers';
    console.log(title)
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};

export default PageTitle;
