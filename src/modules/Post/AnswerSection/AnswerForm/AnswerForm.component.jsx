import React, {Fragment, useState, useRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addAnswer} from '../../../../redux/answers/answers.actions';


import LinkButton from '../../../../components/molecules/LinkButton/LinkButton.component';
import MarkdownEditor from '../../../../components/organisms/MarkdownEditor/MarkdownEditor.component';

import './AnswerForm.styles.scss';

const AnswerForm = ({addAnswer, auth, post: {post}}) => {
  const [formData, setFormData] = useState({
    text: '',
  });

  const markdownEditorRef = useRef(null);

  const {text} = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    addAnswer(post.id, {text});
    setFormData({
      text: '',
    });
    markdownEditorRef.current.cleanEditorState();
  };

  const updateConvertedContent = (htmlConvertedContent) => {
    setFormData({...formData, text: htmlConvertedContent});
  };

  return (
    <Fragment>
      {!auth.loading && auth.isAuthenticated ? (
        <Fragment>
          <form className='answer-form' onSubmit={(e) => handleSubmit(e)}>
            <div className='answer-grid'>
              <label className=' fc-black-800'>Your Answer</label>
              <div className='s-textarea rich-text-editor-container'>
                <MarkdownEditor
                  ref={markdownEditorRef}
                  onChange={updateConvertedContent}
                />
              </div>
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
  auth: PropTypes.object.isRequired,
  addAnswer: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {addAnswer})(AnswerForm);
