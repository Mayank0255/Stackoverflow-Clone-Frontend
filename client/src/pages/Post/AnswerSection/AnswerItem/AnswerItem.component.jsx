import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {deleteAnswer} from '../../../../redux/answers/answers.actions';

import {ReactComponent as UpVote} from '../../../../assets/ArrowUpLg.svg';
import {ReactComponent as DownVote} from '../../../../assets/ArrowDownLg.svg';
import UserCard from '../../../../components/UserCard/UserCard.component';

import './AnswerItem.styles.scss';

const AnswerItem = ({
  deleteAnswer,
  answer: {body, user_id, id, created_at, username},
  auth,
  postId,
}) => {
  return (
    <Fragment>
      <div className='answer-layout'>
        <div className='vote-cell'>
          <div className='vote-container'>
            <button
              className='vote-up'
              title='This answer is useful (click again to undo)'
            >
              <UpVote className='icon' />
            </button>
            <div className='vote-count fc-black-500'>0</div>
            <button
              className='vote-down'
              title='This answer is not useful (click again to undo)'
            >
              <DownVote className='icon' />
            </button>
          </div>
        </div>
        <div className='answer-item'>
          <div className='answer-content fc-black-800'>
            <p>{body}</p>
          </div>
          <div className='answer-actions'>
            <div className='action-btns'>
              <div className='answer-menu'>
                <Link
                  className='answer-links'
                  title='short permalink to this question'
                  to='/'
                >
                  share
                </Link>
                <Link
                  className='answer-links'
                  title='Follow this question to receive notifications'
                  to='/'
                >
                  follow
                </Link>
                {!auth.loading &&
                  auth.isAuthenticated &&
                  parseInt(user_id) === auth.user.id && (
                    <Link
                      className='s-link s-link__danger'
                      style={{paddingLeft: '4px'}}
                      title='Delete the answer'
                      onClick={(e) => deleteAnswer(id)}
                      to={`/questions/${postId}`}
                    >
                      delete
                    </Link>
                  )}
              </div>
            </div>
            <UserCard
              created_at={created_at}
              user_id={user_id}
              username={username}
              dateType={'answered'}
              backgroundColor={'transparent'}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AnswerItem.propTypes = {
  deleteAnswer: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
};

export default connect(null, {deleteAnswer})(AnswerItem);
