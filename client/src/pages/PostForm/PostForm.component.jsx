import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addPost } from '../../redux/posts/posts.actions';

import Spinner from '../../components/spinner/spinner.component';
import AskWidget from './AskWidget/AskWidget.component';

import './PostForm.styles.scss';

const PostForm = ({ auth: { isAuthenticated, loading }, addPost }) => {

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

    return loading === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <div className='post-form-container'>
            <div className='post-form-content'>
                <div className='post-form-header'>
                    <div className='post-form-headline fc-black-800'>
                        Ask a public question
                    </div>
                </div>
                <div className='post-form-section'>
                    <div className='postform' style={{width: '100%'}}>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className='question-form p16 s-card'>
                                <div className='question-layout'>
                                    <div className='title-grid'>
                                        <label className='form-label s-label'>
                                            Title
                                            <p className='title-desc fw-normal fs-caption'>
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
                                        <label className='form-label s-label fc-black-800'>
                                            Body
                                            <p className='body-desc fw-normal fs-caption fc-black-800'>Include all the information someone would
                                                need to answer your question</p>
                                        </label>
                                        <textarea
                                            className='s-textarea'
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
                                            <p className='tag-desc fw-normal fs-caption'>
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
                            </div>
                            <div className='post-button mt32'>
                                <button className='s-btn s-btn__primary' id='submit-button' name='submit-button'>Post your question</button>
                            </div>
                        </form>
                    </div>
                    <aside>
                        <div className='right-panel'>
                            <AskWidget/>
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