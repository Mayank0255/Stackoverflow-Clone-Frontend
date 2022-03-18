import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { getProfile } from '../../redux/users/users.actions';

import UserSection from "./UserSection/UserSection.component";
import PageTitle from '../../components/PageTitle/PageTitle.component';
import Spinner from '../../components/Spinner/Spinner.component';
import ExternalUserDetails from "./ExternalUserDetails/ExternalUserDetails.component";
import UserActivity from "./UserActivity/UserActivity.component";

import './ProfilePage.styles.scss';

const ProfilePage = ({getProfile, user: {user, loading}, match}) => {
  useEffect(() => {
    getProfile(match.params.id);
    // eslint-disable-next-line
  }, [getProfile]);

  return loading || user === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <PageTitle title={`User ${user.username} - CLONE Stack Overflow`} />
      <div id='mainbar' className='user-main-bar pl24 pt24'>
        <div className='user-card'>
          <div className='grid--cell s-navigation mb16'>
            <Link
              to='#'
              className='s-navigation--item is-selected'
              data-shortcut='P'
            >
              Profile
            </Link>
            <Link to='#' className='s-navigation--item' data-shortcut='A'>
              Activity
            </Link>
          </div>
          <UserSection user={user}/>
        </div>
        <div className='row-grid'>
          <ExternalUserDetails/>
          <UserActivity/>
        </div>
      </div>
    </Fragment>
  );
};

ProfilePage.propTypes = {
  getProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {getProfile})(ProfilePage);
