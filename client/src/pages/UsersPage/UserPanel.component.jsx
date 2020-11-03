import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './UserPanel.styles.scss';

const UserPanel = ({ user: { id, username, created_at, posts_count, tags_count, views } }) => {
    return (
        <div className='user-panel-info s-card bs-sm h:bs-md fc-black-500'>
            <div className='user-gravatar'>
                <Link to={`/users/${id}`}>
                    <div className='logo-wrapper'>
                        <img alt='user-logo'
                             src={`https://secure.gravatar.com/avatar/${id}?s=164&d=identicon`}/>
                    </div>
                </Link>
            </div>
            <div className='user-details'>
                <Link className='fc-blue-600' to={`/users/${id}`}>{username}</Link>
                <span className='post-count'>questions - {posts_count}</span>
                <span className='tag-count'>tags - {tags_count}</span>
                <span style={{fontSize:'11px', float:'right'}}>{ moment(created_at).fromNow(true) } ago</span>
            </div>
        </div>
    )
};

UserPanel.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect(null)(UserPanel);