import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../redux/users/users.actions';

import SideBar from '../../components/sideBar/sideBar.component';
import UserPanel from './UserPanel/UserPanel.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import Spinner from "../../components/spinner/spinner.component";
import SearchBox from "../../components/SearchBox/SearchBox.component";

import './UsersPage.styles.scss';

const UsersPage = ({ getUsers, user: { users, loading }  }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const [ fetchSearch, setSearch] = useState('');

    const handleChange = e => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    return loading || users === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id='content'>
                <div id='mainbar' className='users-page fc-black-800'>
                    <h1 className='headline'>Users</h1>
                    <div className='headline-count'>
                        <div>
                            <span>1,025 users</span>
                            <SearchBox
                                placeholder={'filter by user'}
                                handleChange={handleChange}
                                pt={'pt12'}
                            />
                        </div>
                    </div>
                    <div className='user-browser'>
                        <div className='grid-layout'>
                            {users.filter(user => user.username.toLowerCase().includes(fetchSearch.toLowerCase())).map(user => (
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