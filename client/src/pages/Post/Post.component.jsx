import React, {useEffect, Fragment,useState} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost, deletePost } from '../../redux/posts/posts.actions';
import { getAnswers, deleteAnswer, addAnswer } from '../../redux/answers/answers.actions';
import { getComments, deleteComment, addComment } from '../../redux/comments/comments.actions';

import { ReactComponent as UpVote } from '../../assets/ArrowUpLg.svg';
import { ReactComponent as DownVote } from '../../assets/ArrowDownLg.svg';

import SideBar from '../../components/sideBar/sideBar.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import PageTitle from "../../components/pageTitle/pageTitle.component";
import UserCard from "../../components/UserCard/UserCard.component";

import './Post.styles.scss'
import Spinner from "../../components/spinner/spinner.component";

const Post = (
    {
        deletePost,
        deleteAnswer,
        addAnswer,
        deleteComment,
        addComment,
        getAnswers,
        getComments,
        auth,
        getPost,
        answer,
        comment,
        post: {
            post,
            loading
        },
        match
    }) => {

    useEffect(() => {
        getPost(match.params.id);
        getAnswers(match.params.id);
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

    const [ formDataAnswer, setFormDataAnswer ] = useState({
        text: ''
    });

    const { text } = formDataAnswer;

    const onChangeAnswer = e => setFormDataAnswer({ ...formData, [e.target.name]: e.target.value });

    const onSubmitAnswer = async e => {
        e.preventDefault();
        addAnswer(match.params.id,{text});
        setFormDataAnswer({
            text: ''
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
                            <Link className='s-btn s-btn__primary' to='/add/question'>
                                Ask Question
                            </Link>
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
                                        <div className='tag-cell'>
                                            <Link className='s-tag' to={`/tags/${post.tagname}`}>{post.tagname}</Link>
                                        </div>
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
                                                            <Link className='s-tag' to={`/users/${comment.user_id}`}>
                                                                {comment.username}
                                                            </Link>
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
                                            <Link to='/login'>
                                                <button type='button' className="s-btn">You need to login to add a comment</button>
                                            </Link>
                                        </Fragment>}

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='answer'>
                            <div className='answer-header fc-black-800'>
                                <div className='answer-sub-header'>
                                    <div className='answer-headline'>
                                        <h2>Answers</h2>
                                    </div>
                                    <div className="grid--cell">
                                        <div className=" grid s-btn-group js-filter-btn">
                                            <Link className="s-btn s-btn__filled is-selected"
                                               to="#"
                                               data-nav-xhref="" title="Answers with the latest activity first"
                                               data-value="active" data-shortcut="A">
                                                Active
                                            </Link>
                                            <Link className="s-btn s-btn__filled"
                                               to="#"
                                               data-nav-xhref="" title="Answers in the order they were provided"
                                               data-value="oldest" data-shortcut="O">
                                                Oldest
                                            </Link>
                                            <Link className="s-btn s-btn__filled"
                                               to="#"
                                               data-nav-xhref="" title="Answers with the highest score first"
                                               data-value="votes" data-shortcut="V">
                                                Votes
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {answer.loading === null ? <Spinner width='25px' height='25px'/> : answer.answers.map(answer => (
                                <div key={answer.id} className='answers'>
                                    <div className='answer-layout'>
                                        <div className='vote-cell'>
                                            <div className='vote-container'>
                                                <button
                                                    className='vote-up'
                                                    title='This answer is useful (click again to undo)'
                                                >
                                                    <UpVote className='icon'/>
                                                </button>
                                                <div className='vote-count fc-black-500'>0</div>
                                                <button
                                                    className='vote-down'
                                                    title='This answer is not useful (click again to undo)'
                                                >
                                                    <DownVote className='icon'/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className='answer-item'>
                                            <div className='answer-content fc-black-800'>
                                                <p>
                                                    {answer.body}
                                                </p>
                                            </div>
                                            <div className='answer-actions'>
                                                <div className='action-btns'>
                                                    <div className='answer-menu'>
                                                        <Link className='answer-links' title='short permalink to this question' to='/'>
                                                            share
                                                        </Link>
                                                        <Link className='answer-links' title='Follow this question to receive notifications' to='/'>
                                                            follow
                                                        </Link>
                                                        {!auth.loading && auth.isAuthenticated && parseInt(answer.user_id) === auth.user.id && (
                                                            <Link
                                                                className='s-link s-link__danger'
                                                                style={{paddingLeft: '4px'}}
                                                                title='Delete the answer'
                                                                onClick={e => deleteAnswer(answer.id)}
                                                                to={`/questions/${post.id}`}
                                                            >
                                                                delete
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                                <UserCard
                                                    created_at={answer.created_at}
                                                    user_id={answer.user_id}
                                                    username ={answer.username}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='add-answer'>
                                {!auth.loading && auth.isAuthenticated ? <Fragment>
                                    <form
                                        className='answer-form'
                                        onSubmit={e => onSubmitAnswer(e)}
                                    >
                                        <div className='answer-grid'>
                                            <label className=' fc-black-800'>Your Answer</label>
                                            <textarea
                                                className='s-textarea'
                                                name='text'
                                                cols='30'
                                                rows='12'
                                                value={text}
                                                onChange={e => onChangeAnswer(e)}
                                                placeholder='Enter body with minimum 30 characters'
                                                id='text'
                                            >
                                            </textarea>
                                            <button className='s-btn s-btn__primary'>Post Your Answer</button>
                                        </div>
                                    </form>
                                </Fragment> : <Fragment>
                                    <Link to='/login'>
                                        <button type='button' style={{marginTop: '12px'}} className="s-btn s-btn__outlined">You need to login to add an answer</button>
                                    </Link>
                                </Fragment>}
                            </div>
                        </div>
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
    addAnswer: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    getAnswers: PropTypes.func.isRequired,
    answer: PropTypes.object.isRequired,
    getComments: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth,
    answer: state.answer,
    comment: state.comment
});

export default connect(mapStateToProps, { getPost, deletePost, deleteAnswer, deleteComment, getAnswers,addAnswer, getComments, addComment })(Post);