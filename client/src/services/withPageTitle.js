import React, {Fragment} from 'react';
import PageTitle from '../components/PageTitle/PageTitle.component';

const withPageTitle = ({ component: Component, title }) => {
    return class Title extends React.Component {
        render() {
            return (
                <Fragment>
                    <PageTitle title={title} />
                    <Component {...this.props} />
                </Fragment>
            );
        }
    };
};

export default withPageTitle;