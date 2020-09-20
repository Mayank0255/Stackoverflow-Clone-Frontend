import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as SpinnerGif } from '../../assets/Spinner.svg';
import './spinner.styles.scss';

const Spinner = ({type}) => {
    const gif = (
        <SpinnerGif/>
    )

    return (
        <div>
            { type === 'page' ? <Fragment><SpinnerGif/></Fragment> : 'Loading...' }
        </div>
    );
};

// Spinner.propTypes = {
//     type: PropTypes.object.isRequired
// };

export default connect(null)(Spinner);