import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUsers} from '../../redux/users/users.actions';
import handleSorting from '../../services/handleSorting';

import { Pagination, PaginationItem } from '@mui/material';

import UserPanel from './UserPanel/UserPanel.component';
import Spinner from '../../components/Spinner/Spinner.component';
import SearchBox from '../../components/SearchBox/SearchBox.component';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';

import './AllUsersPage.styles.scss';

const itemsPerPage = 12;

const AllUsersPage = ({getUsers, user: {users, loading}}) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [page, setPage] = useState(1);
  const [fetchSearch, setSearch] = useState('');
  const [sortType, setSortType] = useState('Popular');

  const handlePaginationChange = (e, value) => setPage(value);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1)
  };

  return loading || users === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <div id='mainbar' className='users-page fc-black-800'>
        <h1 className='headline'>Users</h1>
        <div className='headline-count'>
          <span>
            {new Intl.NumberFormat('en-IN').format(users.length)} users
          </span>
        </div>
        <div className='users-box pl16 pr16 pb16'>
          <SearchBox
            placeholder={'filter by user'}
            handleChange={handleChange}
            width={'200px'}
          />
          <ButtonGroup
            buttons={['Popular', 'Name', 'Active', 'New Users']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
        <div className='user-browser'>
          <div className='grid-layout'>
            {users
              .filter((user) =>
                user.username.toLowerCase().includes(fetchSearch.toLowerCase())
              )
              ?.sort(handleSorting(sortType, 'users'))
              .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
              .map((user, index) => (
                <UserPanel key={index} user={user} />
              ))}
          </div>
        </div>
        <Pagination
          style={{ float: 'right', margin: '0 13px 16px 0' }}
          count={Math.ceil(users.filter((user) => user.username.toLowerCase().includes(fetchSearch.toLowerCase())).length/itemsPerPage)}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationChange}
          renderItem={(item) => (
            <PaginationItem {...item} sx={{ color: '#cfd2d6', border: '1px solid #4c4f52' }}/>
          )}
        />
      </div>
    </Fragment>
  );
};

AllUsersPage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers })(AllUsersPage);
