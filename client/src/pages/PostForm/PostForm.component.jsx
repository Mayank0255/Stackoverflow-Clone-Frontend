import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addPost } from '../../redux/posts/posts.actions';

import './PostForm.styles.scss';

const PostForm = ({ auth:{ isAuthenticated, loading }, addPost }) => {
    const [ formData, setFormData ] = useState({
        title: '',
        body: '',
        tagname: ''
    });

    const { title, body, tagname } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        addPost({ title, body, tagname});
        setFormData({
            title: '',
            body: '',
            tagname: ''
        });
    };

    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return loading === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className='post-form-container'>
            <div className='post-form-content'>
                <div className='post-form-header'>
                    <div className='post-form-headline'>
                        Ask a public question
                    </div>
                </div>
                <div className='post-form-section'>
                    <div className='postform'>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className='question-form'>
                                <div className='question-layout'>
                                    <div className='title-grid'>
                                        <label className='form-label s-label'>
                                            Title
                                            <p className='title-desc'>
                                                Be specific and imagine you’re asking a question to another person
                                            </p>
                                        </label>
                                        <input
                                            className='title-input s-input'
                                            type='text'
                                            name='title'
                                            value={title}
                                            onChange={e => onChange(e)}
                                            id='title'
                                            placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                                        />
                                    </div>
                                    <div className='body-grid'>
                                        <label className='form-label s-label'>
                                            Body
                                            <p className='body-desc'>Include all the information someone would
                                                need to answer your question</p>
                                        </label>
                                        <textarea
                                            className='body-input'
                                            name='body'
                                            cols='30'
                                            rows='12'
                                            value={body}
                                            onChange={e => onChange(e)}
                                            placeholder='Enter body with minimum 30 characters'
                                            id='body'
                                        >
                                        </textarea>
                                    </div>
                                    <div className='tag-grid'>
                                        <label className='form-label s-label'>
                                            Tag Name
                                            <p className='tag-desc'>
                                                Add up to 5 tags to describe what your question is about
                                            </p>
                                        </label>
                                        <input
                                            className='tag-input s-input'
                                            type='text'
                                            name='tagname'
                                            value={tagname}
                                            onChange={e => onChange(e)}
                                            id='tagname'
                                            placeholder='e.g. (ajax django string)'
                                        />
                                    </div>
                                </div>
                                <div className='post-button'>
                                    <button className='btn btn-primary' id='submit-button' name='submit-button'>Post your question</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <aside>
                        <div className='right-panel'>
                            <div className='widget'>
                                <div className='widget-header'>
                                    Step 1: Draft your question
                                </div>
                                <div className='widget-content'>
                                    <div className='summary'>
                                        <p className='sec1'>
                                            The community is here to help you with specific coding, algorithm, or language problems.
                                        </p>
                                        <p className='sec2'>
                                            Avoid asking opinion-based questions.
                                        </p>
                                    </div>
                                    <ol className='step-section'>
                                        <li className='step'>
                                            <button >
                                                <div className='step-cell'>
                                                    <div>
                                                        <img src='https://cdn.sstatic.net/Img/list-1.svg?v=e8dd475ba207' width='16' height='16' alt='1.' />
                                                    </div>
                                                    <span>Summarize the problem</span>
                                                </div>
                                            </button>
                                            <div className='inst'>
                                                <div className='inst-content'>
                                                    <ul>
                                                        <li><p>Include details about your goal</p></li>
                                                        <li><p>Describe expected and actual results</p></li>
                                                        <li><p className='except'>Include any error messages</p></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='step'>
                                            <button>
                                                <div className='step-cell'>
                                                    <div>
                                                        <img src='https://cdn.sstatic.net/Img/list-2.svg?v=9382fc2c3631' width='16' height='16' alt='2.' />
                                                    </div>
                                                    <span>Summarize the problem</span>
                                                </div>
                                            </button>
                                            <div className='inst'>
                                                <div className='inst-content'>
                                                    <p className='step2'>
                                                        Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it didn’t meet your needs. You can get better answers when you provide research.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li style={{borderBottomRightRadius:'3px',borderBottomLeftRadius:'3px'}} className='step except-step'>
                                            <button>
                                                <div className='step-cell'>
                                                    <div>
                                                        <img src='https://cdn.sstatic.net/Img/list-3.svg?v=323a95564232' width='16' height='16' alt='3.' />
                                                    </div>
                                                    <span>Summarize the problem</span>
                                                </div>
                                            </button>
                                            <div className='inst'>
                                                <div className='inst-content'>
                                                    <p className='step3'>
                                                        When appropriate, share the minimum amount of code others need to reproduce your problem (also called a minimum, reproducible example)
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </Fragment>
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addPost })(PostForm);