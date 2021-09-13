import React, {Fragment} from 'react';

import './VoteCell.styles.scss';

const VoteCell = ({answerCount, commentCount}) => {
  return (
    <Fragment>
      <div className='vote-cell fc-black-800'>
        <div className='stats'>
          <div className='vote'>
            <span className='vote-count'>{answerCount}</span>
            <div className='count-text'>answers</div>
          </div>
          <div className='vote'>
            <span className='vote-count'>{commentCount}</span>
            <div className='count-text'>comments</div>
          </div>
          <div className='vote'>
            <span className='vote-count'>1</span>
            <div className='count-text'>tags</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VoteCell;
