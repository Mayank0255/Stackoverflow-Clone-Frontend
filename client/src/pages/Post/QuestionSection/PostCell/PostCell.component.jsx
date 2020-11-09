import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost, deletePost } from '../../../../redux/posts/posts.actions';

import TagBadge from '../../../../components/TagBadge/TagBadge.component';
import UserCard from '../../../../components/UserCard/UserCard.component';

import './PostCell.styles.scss';

const PostCell = ({
    deletePost,
    auth,
    post: {
        post: {
            id,
            post_body,
            tagname,
            user_id,
            username,
            created_at
        }
    },
    postId
    }) => {
    useEffect(() => {
        getPost(postId);
        // eslint-disable-next-line
    }, [ getPost ]);

    return <Fragment>
        <div className='post-cell'>
            <div className='post-text fc-black-800'>
                {post_body}
            </div>
            <div className='post-tags fc-black-800'>
                <TagBadge
                    tag_name={tagname}
                    size={'s-tag'}
                    float={'left'}
                />
            </div>
            <div className='post-actions fc-black-800'>
                <div className='post-actions-extended'>
                    <div className='post-btns'>
                        <div className='post-menu'>
                            <Link className='post-links' title='short permalink to this question' to='/'>
                                share
                            </Link>
                            <Link className='post-links' title='Follow this question to receive notifications' to='/'>
                                follow
                            </Link>
                            {!auth.loading && auth.isAuthenticated && parseInt(user_id) === auth.user.id && (
                                <Link
                                    className='s-link s-link__danger'
                                    style={{paddingLeft: '4px'}}
                                    title='Delete the post'
                                    onClick={e => deletePost(id)}
                                    to='/questions'
                                >
                                    delete
                                </Link>
                            )}
                        </div>
                    </div>
                    <UserCard
                        created_at={created_at}
                        user_id={user_id}
                        username ={username}
                    />
                </div>
            </div>
        </div>
    </Fragment>
}

PostCell.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPost, deletePost })(PostCell);