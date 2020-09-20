import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../redux/users/users.actions';

import './UsersPage.styles.scss'
import SideBar from '../../components/sideBar/sideBar.component';
import UserPanel from './UserPanel.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import Spinner from "../../components/spinner/spinner.component";

const UsersPage = ({ getUsers, user: { users, loading }  }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return loading || users === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id='content'>
                <div id='mainbar' className='users-page fc-black-800'>
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
                <RightSideBar/>
            </div>
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