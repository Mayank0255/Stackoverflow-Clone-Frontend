import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './postItem.styles.scss';

const PostItem = ({ post: { id, title, body, tagname, username, user_id, answer_count, comment_count, created_at } }) => {
    const answerVoteUp = (
        <div className='vote answer'>
            <span className='vote-count fc-green-500'>{answer_count}</span>
            <div className='count-text'>answers</div>
        </div>
    )

    const answerVoteDown = (
        <div className='vote'>
            <span className='vote-count'>{answer_count}</span>
            <div className='count-text'>answers</div>
        </div>
    )

    return (
        <div className='posts'>
            <div className='stats-container fc-black-500'>
                <div className='stats'>
                    <div className='vote'>
                        <span className='vote-count'>{comment_count}</span>
                        <div className='count-text'>comments</div>
                    </div>
                    {answer_count > 0 ? answerVoteUp : answerVoteDown}
                    <div className='vote'>
                        <span className='vote-count'>{tagname ? 1 : 0}</span>
                        <div className='count-text'>tags</div>
                    </div>
                </div>
            </div>
            <div className='summary'>
                <h3><Link to={`/questions/${id}`}>
                    {title}
                </Link></h3>
                <div className='brief'>
                    {body.substring(0, 200)}...
                </div>
                <div className='question-tags'>
                    <Link className='s-tag' to={`/tags/${tagname}`}>
                        {tagname}
                    </Link>
                </div>
                <div className='question-user'>
                    <div className='user-info'>
                        <div className='user-action-time'>asked { moment(created_at).fromNow(true) } ago</div>
                        <div className='user-gravatar'>
                            <Link to={`/users/${user_id}`}>
                                <div className='logo-wrapper'>
                                    <img alt='userlogo'
                                         src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAQlBMVEXw8PB+3GTy8PJ221n28fd83GGV4ILb7Nea4InX69L08fXe7duP33uW4IP78v1421zs7+tt2k2n4pmD3WvG6L6I3XHpYYlTAAAB70lEQVR4nO3dSU7DQBCG0QzOQGxjhnD/q8IqW6ql6qYi3neAsh8iu+jPbidJkiRJ0n/t8MSFgG+X522OEA+X9+PTtkwh4XH/rJ3OhITVIySsHyFh/QgJ60dIWD9CwvoREtaPkLB+hIT1IySsHyFh/QgfwlOg4CPHntpiwnk5/976GXqrZR166vxxCwh3hynQ6zXypz9exp6aQsBYU+y1XgLfb0k8lRkhYZ9TmRES9jmVGSFhn1OZERL2OZUZIWGfU5kREvY5lRkhYZ9TmRES9jmVGSFhn1OZERL2OZUZIWGfU9Ei6wx/ILyNXY2Y18HC7T4PXo0IfUckUbjfSq5GZAojjf9OFCFha4SE7REStkZI2B4hYWuEhO0RErZGSNgeIWFrhITtERK2RkjYHiFha4QPYWjrIVJwcWDLel7makSodTlfA31F9iBiJa5GxJoj/w7b+pr2wMTViFCxj3Tsw1MzQsL6ERLWj5CwfoSE9SMkrB8hYf0ICetHSFg/QsL6ERLWj5Cw34tldZtDwnVKe2LiakSo+b5FhEtkDyL4xMTViFAR4A8x7XnjVyNG55d0COtHSFg/QsL6ERLWj5CwfoSE9SMkrB8hYf0ICetHSFg/QsL6ET6EWSMOwxu+GjG+4asRwxu9GiFJkiRJUpm+AcyRpXgH9yu9AAAAAElFTkSuQmCC'/>
                                </div>
                            </Link>
                        </div>
                        <div className='user-details'>
                            <Link to={`/users/${user_id}`}>
                                {username}
                            </Link>
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