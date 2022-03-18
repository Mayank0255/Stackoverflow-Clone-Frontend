import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './Alert.styles.scss';

const Alert = ({ alerts }) => {
  return alerts.length > 0 &&
    alerts.map((alert, index) => {
      if (alert.alertType === 'success') {
        return (
          <aside key={index} className="alert s-notice s-notice__success s-notice__important" role="alert">
            {alert.msg}
          </aside>
        )
      } else {
        return (
          <aside key={index} className="alert s-notice s-notice__danger s-notice__important" role="alert">
            {alert.msg}
          </aside>
        )
      }
    }
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
