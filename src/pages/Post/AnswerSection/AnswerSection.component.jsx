import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAnswers} from '../../../redux/answers/answers.actions';
import handleSorting from '../../../services/handleSorting';

import AnswerItem from './AnswerItem/AnswerItem.component';
import Spinner from '../../../components/Spinner/Spinner.component';
import AnswerForm from './AnswerForm/AnswerForm.component';
import ButtonGroup from '../../../components/ButtonGroup/ButtonGroup.component';

import './AnswerSection.styles.scss';

const AnswerSection = ({getAnswers, answer, post: {post}}) => {
  useEffect(() => {
    getAnswers(post.id);
    // eslint-disable-next-line
  }, [getAnswers]);

  const [sortType, setSortType] = useState('Newest');

  return (
    <Fragment>
      <div className='answer'>
        <div className='answer-header fc-black-800'>
          <div className='answer-sub-header'>
            <div className='answer-headline'>
              <h2>Answers</h2>
            </div>
            <ButtonGroup
              buttons={['Newest', 'Oldest']}
              selected={sortType}
              setSelected={setSortType}
            />
          </div>
        </div>
        {answer.loading === null ? (
          <Spinner width='25px' height='25px' />
        ) : (
          answer.answers?.sort(handleSorting(sortType)).map((answer) => (
            <div key={answer.id} className='answers'>
              <AnswerItem answer={answer}/>
            </div>
          ))
        )}
        <div className='add-answer'>
          <AnswerForm/>
        </div>
      </div>
    </Fragment>
  );
};

AnswerSection.propTypes = {
  getAnswers: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  answer: state.answer,
  post: state.post,
});

export default connect(mapStateToProps, {getAnswers})(AnswerSection);
