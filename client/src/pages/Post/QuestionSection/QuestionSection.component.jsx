import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost, deletePost } from '../../../redux/posts/posts.actions';

import TagBadge from '../../../components/TagBadge/TagBadge.component';
import UserCard from '../../../components/UserCard/UserCard.component';
import CommentCell from './CommentCell/CommentCell.component';

import './QuestionSection.styles.scss';

const QuestionSection = ({
        deletePost,
        auth,
        getPost,
        post: {
            post: {
                id,
                post_body,
                tagname,
                user_id,
                username,
                answer_count,
                comment_count,
                created_at
            }
        },
        paramId
    }) => {
    useEffect(() => {
        getPost(paramId);
        // eslint-disable-next-line
    }, [ getPost ]);

    return <Fragment>
        <div className='question'>
            <div className='post-layout'>
                <div className='vote-cell fc-black-800'>
                    <div className='stats'>
                        <div className='vote'>
                            <span className='vote-count'>{answer_count}</span>
                            <div className='count-text'>answers</div>
                        </div>
                        <div className='vote'>
                            <span className='vote-count'>{comment_count}</span>
                            <div className='count-text'>comments</div>
                        </div>
                        <div className='vote'>
                            <span className='vote-count'>1</span>
                            <div className='count-text'>tags</div>
                        </div>
                    </div>
                </div>
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
                <CommentCell
                    paramId={paramId}
                    postId={id}
                />
            </div>
        </div>
    </Fragment>
}

QuestionSection.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getPost, deletePost })(QuestionSection);