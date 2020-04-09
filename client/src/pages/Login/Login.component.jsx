import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from "../../redux/auth/auth.actions";
import PropTypes from 'prop-types';


import './Login.styles.scss'
import {ReactComponent as Logo} from "../../assets/stack-overflow.svg";

const Login = ({ login, isAuthenticated }) => {
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        login({ username, password });
    };

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return(
        <div className="page">
            <div className='register-content'>
                <div className='register-grid'>
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
                                </div>
                                <div className="grid gs4 gsy fd-column js-auth-item ">
                                    <button className="btn btn-primary" id="submit-button" name="submit-button">Log in</button>
                                </div>
                            </form>
                            <div className="fs-caption license">
                                By clicking “Log In”, you agree to our <Link to='https://stackoverflow.com/legal/terms-of-service/public' className='-link'>
                                terms of service</Link>, <Link to='https://stackoverflow.com/legal/privacy-policy' name='privacy' className='-link'>
                                privacy policy</Link> and <Link to='https://stackoverflow.com/legal/cookie-policy' className='-link'>cookie policy</Link>
                                <input type="hidden" name="legalLinksShown" value="1"/>
                            </div>
                        </div>
                        <div className='redirects'>
                            Don't have an account? <Link to='/register' name='login'>Sign up</Link>
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);