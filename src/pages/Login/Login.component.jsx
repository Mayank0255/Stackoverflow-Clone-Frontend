import React, {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AuthForm from '../../components/AuthForm/AuthForm.component';

const Login = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <div className='auth-page'>
        <div className='register-content'>
          <div className='register-grid'>
            <AuthForm action={'Log in'} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(Login);
