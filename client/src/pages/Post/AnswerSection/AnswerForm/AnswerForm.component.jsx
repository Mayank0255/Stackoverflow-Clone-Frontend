import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addAnswer} from '../../../../redux/answers/answers.actions';

import LinkButton from '../../../../components/LinkButton/LinkButton.component';

import './AnswerForm.styles.scss';

const AnswerForm = ({addAnswer, auth, postId}) => {
  const [formData, setFormData] = useState({
    text: '',
  });

  const {text} = formData;

  const handleChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    addAnswer(postId, {text});
    setFormData({
      text: '',
    });
  };

  return (
    <Fragment>
      {!auth.loading && auth.isAuthenticated ? (
        <Fragment>
          <form className='answer-form' onSubmit={(e) => handleSubmit(e)}>
            <div className='answer-grid'>
              <label className=' fc-black-800'>Your Answer</label>
              <textarea
                className='s-textarea'
                name='text'
                cols='30'
                rows='12'
                value={text}
                onChange={(e) => handleChange(e)}
                placeholder='Enter body with minimum 30 characters'
                id='text'
              />
              <button className='s-btn s-btn__primary'>Post Your Answer</button>
            </div>
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <LinkButton
            text={'You need to login to add an answer'}
            link={'/login'}
            type={'s-btn__outlined'}
            marginTop={'12px'}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

AnswerForm.propTypes = {
  addAnswer: PropTypes.func.isRequired,
};

export default connect(null, {addAnswer})(AnswerForm);
