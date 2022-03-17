import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import {ReactComponent as QuoteLogo} from '../../../assets/Quote.svg';
import {ReactComponent as VoteLogo} from '../../../assets/Vote.svg';
import {ReactComponent as TagsLogo} from '../../../assets/Tags.svg';
import {ReactComponent as TrophyLogo} from '../../../assets/Trophy.svg';

import './Caption.styles.scss';

const Caption = () => {
  return (
    <Fragment>
      <div className='caption fc-black-600'>
        <h3>Join the Stack Overflow community</h3>
        <div className='caption-item'>
          <div className='grid-icon'>
            <QuoteLogo/>
          </div>
          <div className='grid-cell'>Get unstuck — ask a question</div>
        </div>
        <div className='caption-item'>
          <div className='grid-icon'>
            <VoteLogo/>
          </div>
          <div className='grid--cell'>
            Unlock new privileges like voting and commenting
          </div>
        </div>
        <div className='caption-item'>
          <div className='grid-icon'>
            <TagsLogo/>
          </div>
          <div className='grid-cell'>
            Save your favorite tags, filters, and jobs
          </div>
        </div>
        <div className='caption-item'>
          <div className='grid-icon'>
            <TrophyLogo/>
          </div>
          <div className='grid-cell'>Earn reputation and badges</div>
        </div>
        <div className='caption-item fc-black-600'>
          <div>
            Use the power of Stack Overflow inside your organization.
            <br />
            Try a{' '}
            <Link to='https://stackoverflow.com/teams?utm_source=so-owned&utm_medium=product&utm_campaign=public-sign-up&utm_content=teams'>
              free trial of Stack Overflow for Teams
            </Link>
            .
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Caption;
