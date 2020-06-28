import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../redux/users/users.actions';
// import { Link } from 'react-router-dom';

import './UsersPage.styles.scss'
import SideBar from '../../components/SideBar/SideBar.component';
import UserPanel from '../../components/UserPanel/UserPanel.component';
import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

const UsersPage = ({ getUsers, user: { users, loading }  }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div className='page'>
            <SideBar/>
            <div className='userspage'>
                <div className='mainbar'>
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
    )
};

UsersPage.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps,{ getUsers })(UsersPage);