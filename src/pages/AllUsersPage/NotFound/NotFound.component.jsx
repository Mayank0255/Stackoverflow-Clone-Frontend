import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import './NotFound.styles.scss';

const NotFound = () => {
  return (
    <Fragment>
      <div className='page'>
        <div className='box'>
          <div className='box__ghost'>
            <div className='symbol' />
            <div className='symbol' />
            <div className='symbol' />
            <div className='symbol' />
            <div className='symbol' />
            <div className='symbol' />

            <div className='box__ghost-container'>
              <div className='box__ghost-eyes'>
                <div className='box__eye-left' />
                <div className='box__eye-right' />
              </div>
              <div className='box__ghost-bottom'>
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
            <div className='box__ghost-shadow' />
          </div>
          <div className='box__description'>
            <div className='box__description-container'>
              <div className='box__description-title fc-black-800'>Whoops!</div>
              <div className='box__description-text fc-black-500'>
                It seems like we couldn't find the page you were looking for
              </div>
            </div>
            <Link to='/' className='box__button'>
              Back to home page
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
