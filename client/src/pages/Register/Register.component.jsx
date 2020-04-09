import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../redux/alert/alert.actions';
import { register } from '../../redux/auth/auth.actions';
import PropTypes from 'prop-types';

import { ReactComponent as Logo } from '../../assets/stack-overflow.svg';

import './Register.styles.scss'

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        register({ username, password });
    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <div className="page">
            <div className='register-content'>
                <div className='register-grid'>
                    <div className='caption'>
                        <h3>Join the Stack Overflow community</h3>
                        <div className='caption-item'>
                            <div className='grid-icon'>
                                <svg width="26" height="26" className="svg-icon mtn2">
                                    <path opacity=".5"
                                          d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"/>
                                    <path
                                        d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"/>
                                </svg>
                            </div>
                            <div className="grid--cell">Get unstuck — ask a question</div>
                        </div>
                        <div className='caption-item'>
                            <div className='grid-icon'>
                                <svg width="26" height="26" className="svg-icon mtn2">
                                    <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"/>
                                    <path opacity=".5"
                                          d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"/>
                                </svg>
                            </div>
                            <div className="grid--cell">Unlock new privileges like voting and commenting</div>
                        </div>
                        <div className='caption-item'>
                            <div className='grid-icon'>
                                <svg width="26" height="26" className="svg-icon mtn2">
                                    <path
                                        d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"/>
                                    <path opacity=".5"
                                          d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"/>
                                </svg>
                            </div>
                            <div className="grid--cell">Save your favorite tags, filters, and jobs</div>
                        </div>
                        <div className='caption-item'>
                            <div className='grid-icon'>
                                <svg width="26" height="26" className="svg-icon mtn2">
                                    <path
                                        d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"/>
                                </svg>
                            </div>
                            <div className="grid--cell">Earn reputation and badges</div>
                        </div>
                        <div className='caption-item fs-light'>
                            <div className="grid">
                                Use the power of Stack Overflow inside your organization.
                                <br/>
                                Try a <a href='https://stackoverflow.com/teams?utm_source=so-owned&utm_medium=product&utm_campaign=public-sign-up&utm_content=teams'>free trial of Stack Overflow for Teams</a>.
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="IconHolder">
                            <Logo className="Icon"/>
                        </div>
                        <div className='formContainer'>
                            <form className='login-form' onSubmit={e => onSubmit(e)}>
                                <div className="grid">
                                    <label className="form-label s-label">Username</label>
                                    <input
                                        className="form-input s-input"
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={e => onChange(e)}
                                        id="username"

                                    />
                                </div>
                                <div className="grid ">
                                    <label className="form-label s-label">Password</label>
                                    <input
                                        className="form-input s-input"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={e => onChange(e)}
                                        id="password"

                                    />
                                    <p className="fs-caption fc-light">
                                        Passwords must contain at least 5 characters.
                                    </p>
                                </div>
                                <div className="grid gs4 gsy fd-column js-auth-item ">
                                    <button className="btn btn-primary" id="submit-button" name="submit-button">Sign up</button>
                                </div>
                            </form>
                            <div className="fs-caption license">
                                By clicking “Sign up”, you agree to our <Link to='https://stackoverflow.com/legal/terms-of-service/public' className='-link'>
                                terms of service</Link>, <Link to='https://stackoverflow.com/legal/privacy-policy' name='privacy' className='-link'>
                                privacy policy</Link> and <Link to='https://stackoverflow.com/legal/cookie-policy' className='-link'>cookie policy</Link>
                                <input type="hidden" name="legalLinksShown" value="1"/>
                            </div>
                        </div>
                        <div className='redirects'>
                            Already have an account? <Link to='/users/login?ssrc=head&returnurl=%2fusers%2fstory%2fcurrent' name='login'>Log in</Link>
                            <div>
                                Are you an employer? <Link to='https://careers.stackoverflow.com/employer/login' name='talent'>Sign up on Talent <svg aria-hidden="true" className="svg-icon va-text-bottom sm:d-none iconShareSm" width="14" height="14" viewBox="0 0 14 14"><path d="M5 1H3a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V9h-2v2H3V3h2V1z"/><path d="M7 1h6v6h-2V4.5L6.5 9 5 7.5 9.5 3H7V1z"/></svg></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);