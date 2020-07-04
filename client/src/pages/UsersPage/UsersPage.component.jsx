import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../redux/users/users.actions';

import './UsersPage.styles.scss'
import SideBar from '../../components/SideBar/SideBar.component';
import UserPanel from '../../components/UserPanel/UserPanel.component';
import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

const UsersPage = ({ getUsers, user: { users, loading }  }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return loading || users === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div className='users-page'>
                <div className='main-bar'>
                    <h1 className='headline'>Users</h1>
                    <div className='headline-count'>
                        <span>1,025 users</span>
                    </div>
                    <div className='user-browser'>
                        <div className='grid-layout'>
                            {users.map(user => (
                                <UserPanel key={user.id} user = {user}/>))}
                        </div>
                    </div>
                </div>
            </div>
            <RightSideBar/>
        </div>
    </Fragment>
};

UsersPage.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps,{ getUsers })(UsersPage);