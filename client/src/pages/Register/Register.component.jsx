import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../redux/alert/alert.actions';

import Caption from './Caption.component';
import AuthForm from '../../components/AuthForm/AuthForm.component';

import './Register.styles.scss'

const Register = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return <Fragment>
        <div className='auth-page'>
            <div className='register-content'>
                <div className='register-grid'>
                    <Caption/>
                    <AuthForm action={'Sign up'} />
                </div>
            </div>
        </div>
    </Fragment>
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert })(Register);