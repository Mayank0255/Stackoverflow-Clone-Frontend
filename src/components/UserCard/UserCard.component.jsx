import React, { Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './UserCard.styles.scss';

const UserCard = ({
  created_at,
  user_id,
  gravatar,
  username,
  dateType,
  backgroundColor,
}) => {
  return (
    <Fragment>
      <div
        className='owner'
        style={{backgroundColor: backgroundColor}}
      >
        <div className='user-block fc-black-500'>
          <div className='user-logo'>
            <Link className='user-link' to={`/users/${user_id}`}>
              <div className='logo-wrapper'>
                <img
                  alt='user_logo'
                  src={gravatar}
                />
              </div>
            </Link>
          </div>
          <div className="profile-text">
          <div className='user-profile'>
            <Link
              className='user-profile-link fc-blue-600'
              to={`/users/${user_id}`}
            >
              {username}
            </Link>
          </div>
          <div className='action-time'>
            {dateType ? dateType : 'asked'} {moment(created_at).fromNow(true)}{' '}
            ago
          </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserCard;
