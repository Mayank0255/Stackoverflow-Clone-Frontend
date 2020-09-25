import React from 'react';
import './spinner.styles.scss';

import { ReactComponent as PageSpinner } from '../../assets/PageSpinner.svg';
import { ReactComponent as ComponentSpinner } from '../../assets/ComponentSpinner.svg';

const Spinner = ({ type, width, height }) => {
    return (
        <div className='spinner' style={{width: `${width}`, height: `${height}`}}>
            { type === 'page' ? <PageSpinner/> : <ComponentSpinner/> }
        </div>
    );
};

export default Spinner;