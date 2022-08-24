import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../../redux/auth/auth.actions';
import {register} from '../../../redux/auth/auth.actions';

import {ReactComponent as Logo} from '../../../assets/LogoGlyphMd.svg';
import {ReactComponent as ExternalLink} from '../../../assets/ExternalLink.svg';

import './AuthForm.styles.scss';

const AuthForm = ({register, login, action}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const {username, password} = formData;

  const onChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === 'Sign up') {
      register({username, password});
    } else {
      login({username, password});
    }
  };

  const signUpLink = (
    <Fragment>
      Already have an account?{' '}
      <Link to='/login' name='login'>
        Log in
      </Link>
    </Fragment>
  );

  const logInLink = (
    <Fragment>
      Don't have an account?{' '}
      <Link to='/register' name='register'>
        Sign up
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <div>
        <div className='icon-holder'>
          <Logo className='icon' />
        </div>
        <div className='form-container'>
          <form className='login-form' onSubmit={(e) => onSubmit(e)}>
            <div>
              <label className='form-label s-label fc-black-600'>
                Username
              </label>
              <input
                className='form-input s-input'
                type='text'
                name='username'
                value={username}
                onChange={(e) => onChange(e)}
                id='username'
                required
              />
            </div>
            <div>
              <label className='form-label s-label fc-black-600'>
                Password
              </label>
              <input
                className='form-input s-input'
                type='password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                id='password'
                required
              />
            </div>
            <div className='grid gs4 gsy fd-column js-auth-item '>
              <button
                className='s-btn s-btn__primary'
                id='submit-button'
                name='submit-button'
              >
                {action}
              </button>
            </div>
          </form>
          <div className='fs-caption license fc-black-500'>
            By clicking “{action}”, you agree to our{' '}
            <Link
              to='https://stackoverflow.com/legal/terms-of-service/public'
              className='-link'
            >
              terms of service
            </Link>
            ,{' '}
            <Link
              to='https://stackoverflow.com/legal/privacy-policy'
              name='privacy'
              className='-link'
            >
              privacy policy
            </Link>{' '}
            and{' '}
            <Link
              to='https://stackoverflow.com/legal/cookie-policy'
              className='-link'
            >
              cookie policy
            </Link>
            <input type='hidden' name='legalLinksShown' value='1' />
          </div>
        </div>
        <div className='redirects fc-black-500'>
          {action === 'Sign up' ? signUpLink : logInLink}
          <div>
            Are you an employer?{' '}
            <Link
              to='https://careers.stackoverflow.com/employer/login'
              name='talent'
            >
              Sign up on Talent{' '}
              <ExternalLink/>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AuthForm.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login, register})(AuthForm);
