import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './Alert.styles.scss';

const Alert = ({ alerts }) => {
  return alerts.length > 0 &&
    alerts.map((alert, index) => (
      <div
        key={index}
        className={`alert alert-${alert.alertType} fw-normal`}
        style={{ top: `79px` }}
      >
        {alert.msg}
      </div>
    )
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
