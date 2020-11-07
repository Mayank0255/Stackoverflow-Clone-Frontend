import React, {useEffect, Fragment,useState} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost, deletePost } from '../../redux/posts/posts.actions';
import { getComments, deleteComment, addComment } from '../../redux/comments/comments.actions';

import PageTitle from '../../components/pageTitle/pageTitle.component';
import UserCard from '../../components/UserCard/UserCard.component';
import TagBadge from '../../components/TagBadge/TagBadge.component';
import Button from '../../components/Button/Button.component';
import Spinner from '../../components/spinner/spinner.component';
import SideBar from '../../components/sideBar/sideBar.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import AnswerSection from './AnswerSection.component.jsx/AnswerSection.component';

import './Post.styles.scss'

const Post = (
    {
        deletePost,
        deleteComment,
        addComment,
        getAnswers,
        getComments,
        auth,
        getPost,
        comment,
        post: {
            post,
            loading
        },
        match
    }) => {

    useEffect(() => {
        getPost(match.params.id);
        getComments(match.params.id);
        // eslint-disable-next-line
    }, [ getPost, getAnswers, getComments ]);

    const [ formData, setFormData ] = useState({
        body: ''
    });

    const { body } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addComment(match.params.id, {body});
        setFormData({
            body: ''
        });
    };

    return loading || post === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <PageTitle title={`${post.title} - Stack Overflow`}/>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='post'>
                    <div className='question-header fc-black-800 pl24'>
                        <h1>{post.title}</h1>
                        <div>
                            <Button
                                text={'Ask Question'}
                                link={'/add/question'}
                                type={'s-btn__primary'}
                            />
                        </div>
                    </div>
                    <div className='question-date fc-black-800 pl24'>
                        <div className='grid-cell'>
                                <span className='fc-light'>
                                    Asked
                                </span>
                            <time dateTime={ moment(post.created_at).fromNow(true) }>
                                { moment(post.created_at).fromNow(true) } ago
                            </time>
                        </div>
                    </div>
                    <div className='question-main pl24 pt16'>
                        <div className='question'>
                            <div className='post-layout'>
                                <div className='vote-cell fc-black-800'>
                                    <div className='stats'>
                                        <div className='vote'>
                                            <span className='vote-count'>{post.answer_count}</span>
                                            <div className='count-text'>answers</div>
                                        </div>
                                        <div className='vote'>
                                            <span className='vote-count'>{post.comment_count}</span>
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
                                        {post.post_body}
                                    </div>
                                    <div className='post-tags fc-black-800'>
                                        <TagBadge
                                            tag_name={post.tagname}
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
                                                    {!auth.loading && auth.isAuthenticated && parseInt(post.user_id) === auth.user.id && (
                                                        <Link
                                                            className='s-link s-link__danger'
                                                            style={{paddingLeft: '4px'}}
                                                            title='Delete the post'
                                                            onClick={e => deletePost(post.id)}
                                                            to='/questions'
                                                        >
                                                            delete
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                            <UserCard
                                                created_at={post.created_at}
                                                user_id={post.user_id}
                                                username ={post.username}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='comments-cell'>
                                    <div className='comments'>
                                        <ul className='comments-list'>
                                            {comment.loading === null ? <Spinner width='25px' height='25px'/> : comment.comments.map(comment => (
                                                <li className='comments-item' key={comment.id} >
                                                    <div className='comment-text fc-black-800'>
                                                        <div className='comment-body'>
                                                                <span className='body'>
                                                                    {comment.body}
                                                                </span>
                                                            &nbsp;&ndash;&nbsp;
                                                            <TagBadge
                                                                tag_name={comment.username}
                                                                size={'s-tag'}
                                                                link={`/users/${comment.user_id}`}
                                                                display={'inline'}
                                                            />
                                                            <span title={ moment(comment.created_at).fromNow(true) }
                                                                  style={{color: '#959ca3 !important'}}
                                                                  className='date fs-body1'>
                                                                { moment(comment.created_at).fromNow(true) } ago
                                                            </span>
                                                        </div>
                                                        {!auth.loading && auth.isAuthenticated && parseInt(comment.user_id) === auth.user.id && (
                                                            <Link
                                                                className='s-tag s-tag__moderator'
                                                                style={{marginTop: '4px'}}
                                                                title='Delete the comment'
                                                                onClick={e => deleteComment(comment.id)}
                                                                to={`/questions/${post.id}`}
                                                            >
                                                                delete
                                                            </Link>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='add-comment'>
                                        {!auth.loading && auth.isAuthenticated ? <Fragment>
                                            <form className='comment-form' onSubmit={e => onSubmit(e)}>
                                                <div>
                                                    <input
                                                        className='title-input s-input'
                                                        type='text'
                                                        name='body'
                                                        value={body}
                                                        onChange={e => onChange(e)}
                                                        id='title'
                                                        placeholder='add comment'
                                                    />
                                                </div>
                                            </form>
                                        </Fragment> : <Fragment>
                                            <Button
                                                text={'You need to login to add a comment'}
                                                link={'/login'}
                                            />
                                        </Fragment>}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <AnswerSection
                            paramId = {match.params.id}
                            postId={post.id}
                        />
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    </Fragment>
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth,
    comment: state.comment
});

export default connect(mapStateToProps, { getPost, deletePost, deleteComment, getComments, addComment })(Post);