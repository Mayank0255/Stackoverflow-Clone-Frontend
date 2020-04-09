import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './PostItem.styles.scss';

const PostItem = ({ post: {id,title,body,tagname,username,user_id,tag_id,answer_count,comment_count,created_at} }) => {

    const MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
        const day = date.getDate();
        const month = MONTH_NAMES[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = `0${ minutes }`;
        }
        if (prefomattedDate) {
            return `${ prefomattedDate } at ${ hours }:${ minutes }`;
        }
        if (hideYear) {
            return `${ day }. ${ month } at ${ hours }:${ minutes }`;
        }
        return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
    }
    function timeAgo(dateParam) {
        if (!dateParam) {
            return null;
        }
        const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
        const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
        const today = new Date();
        const yesterday = new Date(today - DAY_IN_MS);
        const seconds = Math.round((today - date) / 1000);
        const minutes = Math.round(seconds / 60);
        const isToday = today.toDateString() === date.toDateString();
        const isYesterday = yesterday.toDateString() === date.toDateString();
        const isThisYear = today.getFullYear() === date.getFullYear();
        if (seconds < 5) {
            return 'now';
        } else if (seconds < 60) {
            return `${ seconds } seconds ago`;
        } else if (seconds < 90) {
            return 'about a minute ago';
        } else if (minutes < 60) {
            return `${ minutes } minutes ago`;
        } else if (isToday) {
            return getFormattedDate(date, 'Today'); // Today at 10:20
        } else if (isYesterday) {
            return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
        } else if (isThisYear) {
            return getFormattedDate(date, false, true); // 10. January at 10:20
        }
        return getFormattedDate(date); // 10. January 2017. at 10:20
    }

    return (
        <div className="posts">
            <div className="statsContainer">
                <div className="stats">
                    <div className="vote">
                        <span className="vote-count">{answer_count}</span>
                        <div className="count-text">answers</div>
                    </div>
                    <div className="vote">
                        <span className="vote-count">{comment_count}</span>
                        <div className="count-text">comments</div>
                    </div>
                </div>
            </div>
            <div className="summary">
                <h3><a href={`/questions/${id}`}>
                    {title}
                </a></h3>
                <div className="brief">
                    {body.substring(0, 200)}...
                </div>
                <div className="question-tags">
                    <a href={`/tags/${tagname}`}>
                        {tagname}
                    </a>
                </div>
                <div className="question-user">
                    <div className="user-info">
                        <div className="user-action-time">asked {timeAgo(created_at)}</div>
                        <div className="user-gravatar">
                            <a href={`/users/${user_id}`}>
                                <div className="logo-wrapper">
                                    <img alt='userlogo'
                                         src="https://www.gravatar.com/avatar/ada89e91f90fae77c082024f0c6cf45f?s=32&d=identicon&r=PG&f=1"/>
                                </div>
                            </a>
                        </div>
                        <div className="user-details">
                            <a href={`/users/${user_id}`}>
                                {username}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired
};


export default connect(null)(PostItem);