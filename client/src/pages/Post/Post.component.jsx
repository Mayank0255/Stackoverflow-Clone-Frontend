import React, {useEffect, Fragment,useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost, deletePost } from '../../redux/posts/posts.actions';
import { getAnswers, deleteAnswer, addAnswer } from '../../redux/answers/answers.actions';
import { getComments, deleteComment, addComment } from '../../redux/comments/comments.actions';
import moment from 'moment';
import timeAgo from '../../services/timeAgo.service';

import { ReactComponent as UpVote } from '../../assets/ArrowUpLg.svg';
import { ReactComponent as DownVote } from '../../assets/ArrowDownLg.svg';

import SideBar from '../../components/SideBar/SideBar.component';
import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

import './Post.styles.scss'

const Post = ({ deletePost, deleteAnswer, addAnswer, deleteComment, addComment, getAnswers, getComments, auth, getPost, answer: { answers }, comment: { comments }, post: { post, loading }, match }) => {

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

    return loading || post === null ? <Fragment>Loading...</Fragment> : <Fragment>
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
                                { moment(post.created_at).fromNow(true) }
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
                                            <div className='post-owner'>
                                                <div className='user-block fc-black-500'>
                                                    <div className='action-time'>asked { moment(post.created_at).fromNow(true) }</div>
                                                    <div className='user-logo'>
                                                        <Link className='user-link' to={`/users/${post.user_id}`}>
                                                            <div className='logo-wrapper'>
                                                                <img alt='user_logo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAASFBMVEXw8PB3xdTX5en69PL08vGTzNhyw9Ntw9Kd0NvT4+d5xtRvwtPa5+pxxNP08vCPy9jq7u5jwNG/3OOm0tz+9vSFyNa72+Ku1d7kOy6EAAADxElEQVR4nO2djXKiQBCE/YFdZUFOo3fv/6ZHBD1RU/ZeDUu7didUIGWG+bZnQCvrulhIkiRJkiRJkiRJ0qeqgESZ1Q4K9WuFqE6MaJhVsQqueaXlvl1PDhWflYeyKlZu+Vq+TE1ol9U7E4bsCVEPG0pCu6w+wUMRvj+h+nAeQnkYQ5i/hyIU4RQSoQinimUnEcYR6o4/D6GqVIS3sdSH8xDKwxjC/D0UoQinkG0fcl5p8vdQhCK8jcXZh4nv+FVD6SH6H1LfK4RuO3+fd/u9bjd0O2FfHq/zH7C5G1HaPRzWfTKhTyAMKfrr4XnDZhcUdVsCOm3SqjwBSbVf0AyRYg3ouNm/nhvxk0L0X3jn6yOSFwKIqdggfWGoZpt4Ak+x8UkBK5eeMCQlXM5AiNyf7CQPpyBM62H+hKrSKQjz91B9aCv14RSE+VepPLSV+nAKQnlorOw9nOM1vjy0lZ6XTkGoKhVhnPLvQ93xpyDMvw/loa3Uh1MQykNjzUCY9v+HHaFl9og2rqq64um+q5s8qqe7r1SdH3yJNfwcH1bd68PRBIbn8yMMV42oS+9eC+zVJ394v9v4Q228aoQbvr73mn+/uBz6U719rQPE10KhHtmHwz6l82a7asTxaZmMVScPlXheG2coyxlktISGaZkN1o6VkDEUaVq2HqoPI9JiHCzSgae9W5B6yJiWqpSaEJp+TluljAVPWloiFOE4FmPz0HrIOFikAy/COELG0iJ9Pz7nYJGWFm2VMoYiLS3aPmQMRZqW+jCOkHHgVaUiHMfS3WKOtFSlIhzHYiwt9eFshIyhaD3Uq6cYQsbSoq1SxlCkadESMrY06cCLMI6QsbTk4WyEjOVAOvCf0Iekz9oYB4u0tGirlDEUaWnR9iFjKNK01IdxhIwDryoVIX9an3ClIfWQcbBoCfP3UH0YQ5i/hyKch1DX0hhCLC3oTfT9ihD917AWxMOh43w/ftMCizjUh/slEJ7Jn6BQQFKmhEt3XUziusBEv3LDzaFzv4H1IFalH0K5m+3+EMnJlhBSs0U+osVuIRjLPoSELQxkuFxRcg9pCe08hJZVlYcREuHnEKoPYdF6KEJcIKHZ8n20hG98pcneQ/Xh+xPSeqhXT7BoCfWsDRath7qWwqL1UNdSWPkTqg9FGC1daS6E6kNY+XtIS6g+hEVLKA9xgYRmJ4QWe+0IfafQb+H753/L7THCfdM/fjhb8E9PHH7cvW576NMfFnVbWqmtkSH9Y3bC9gv6MJpibafkJ0TOJ0mSJEmSJEmSJEk56i+zk7G+y6HSlQAAAABJRU5ErkJggg=='/>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className='user-profile'>
                                                        <Link className='user-profile-link fc-blue-600' to={`/users/${post.user_id}`}>{post.username}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='comments-cell'>
                                    <div className='comments'>
                                        <ul className='comments-list'>
                                            {comments.map(comment => (
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
                                                                  className='date fs-body1'>{ moment(comment.created_at).fromNow(true) }
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
                            {answers.map(answer => (
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
                                                    {answer.text}
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
                                                <div className='answer-owner'>
                                                    <div className='answer-user'>
                                                        <div className='answer-user-time fc-black-500'>
                                                            answered&nbsp;
                                                            <span>{ moment(answer.created_at).fromNow(true) }</span>
                                                        </div>
                                                        <div className='answer-logo'>
                                                            <Link className='answer-user-link' to={`/users/${answer.user_id}`}>
                                                                <div className='answer-logo-wrapper'>
                                                                    <img alt='user_logo' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEXw8PDZbnzx9vbr2dvYZHTZa3rdiZTq1Nbej5nw8vHXYXHdh5Lcg47YaHfs3d7z/PvWWmvgnqbv6+zbeobnwcXac4Dip66dwP2nAAACXUlEQVR4nO3dUVLCQBRE0ZghgSQQMKD7X6pLsKeqG1+V9y6gMwf0L47DQERERERERPRPW4yVfOByNF+H8sDd97xdIS7tcXL1OAtPHOfV9bz1OkrC04erkyS8TK7nTTNChL0hRNgbQoT9IUTYG0KE/SFE2BtChP0hRNgbQoT9IUTYG0KE/SFE2BtChP0hrC2chNY2/t79clO23i78moWu20XoKU0pRKdwmu/C17Ovwpdz06a0UzmFwlbNqaLHQoiw/rEQIqx/LIQI6x8LIcL6x0KIsP6xECKsfyyECOsfCyHC+sdCiLD+sRAirH8shAjrH6usULmeQboIoahwOM5KTXjppqpQvLbkzaeyCm0hRJja8oUQYWrLF0KEqS1fCBGmtnwhRJja8oUQYWrLF0KEqS1fCBGmtnwhRJja8oUQYWrLF0KEqS1fXqHvmoBR+o8aypB4ecEmCfercovDU7kPYlZeQhi/lalNOdX2qb1doHyk2nUdq3a3iTTVpB8aBailXblivL1FmnKGEGFmyhlChJkpZwgRZqacIUSYmXKGEGFmyhlChJkpZwgRZqacIUSYmXKGEGFmyhlChJkpZwgRZqbEpD+h/wPhaPrT/mE5mtC+rcKFEA9JOCtT60s6lnZ7gXaZRVMuhDikBypLL+ljUK7YkN/Nubt+aKRfi5F3ohCGtnwhRJja8oUQYWrLF0KEqS1fCBGmtnwhRJja8oUQYWrLF0KEqS1fCBGmtnwhRJja8oUQYWrLF8I+oe9+Bl/OU2m3Roj3M9iynkq6NcJ5P4NUzVMRERERERERlekH6WecNo06EQoAAAAASUVORK5CYII='/>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className='answer-details'>
                                                            <Link className='answer-user-profile-link fc-blue-600' to={`/users/${answer.user_id}`}>{answer.username}</Link>
                                                        </div>
                                                    </div>
                                                </div>
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