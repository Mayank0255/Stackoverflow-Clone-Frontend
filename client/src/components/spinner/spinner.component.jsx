import React, {Fragment} from 'react';
import { ReactComponent as PageSpinner } from '../../assets/PageSpinner.svg';
import './spinner.styles.scss';

const Spinner = ({type}) => {
    return (
        <div>
            { type === 'page' ? <Fragment><PageSpinner/></Fragment> : 'Loading...' }
        </div>
    );
};

export default Spinner;