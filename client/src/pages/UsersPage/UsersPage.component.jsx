import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../../redux/users/users.actions';

import './UsersPage.styles.scss'
import SideBar from '../../components/sideBar/sideBar.component';
import UserPanel from './UserPanel.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import Spinner from "../../components/spinner/spinner.component";
import {ReactComponent as Search} from "../../assets/Search.svg";

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
                            <form id="search"
                                  className="grid--cell fl-grow1 searchbar pt12 js-searchbar " autoComplete="off">
                                <div className="ps-relative search-frame">
                                    <input className="s-input s-input__search h100 search-box" autoComplete="off"
                                           type="text" maxLength="35" placeholder="Filter by user"
                                           onChange= {handleChange}
                                    />
                                    <Search/>
                                </div>
                            </form>
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