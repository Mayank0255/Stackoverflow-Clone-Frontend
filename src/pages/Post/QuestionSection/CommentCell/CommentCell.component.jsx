import React, {useEffect, Fragment, useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  getComments,
  deleteComment,
  addComment,
} from '../../../../redux/comments/comments.actions';

import Spinner from '../../../../components/Spinner/Spinner.component';
import TagBadge from '../../../../components/TagBadge/TagBadge.component';
import LinkButton from '../../../../components/LinkButton/LinkButton.component';

import './CommentCell.styles.scss';

const CommentCell = ({
  deleteComment,
  addComment,
  getComments,
  auth,
  comment,
  post: {post},
}) => {
  useEffect(() => {
    getComments(post.id);
    // eslint-disable-next-line
  }, [getComments]);

  const [formData, setFormData] = useState({
    body: '',
  });

  const {body} = formData;

  const handleChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    addComment(post.id, {body});
    setFormData({
      body: '',
    });
  };

  return (
    <Fragment>
      <div className='comments-cell'>
        <div className='comments'>
          <ul className='comments-list'>
            {comment.loading === null ? (
              <Spinner width='25px' height='25px' />
            ) : (
              comment.comments.map((comment) => (
                <li className='comments-item' key={comment.id}>
                  <div className='comment-text fc-black-800'>
                    <div className='comment-body'>
                      <span className='body'>{comment.body}</span>
                      &nbsp;&ndash;&nbsp;
                      <TagBadge
                        tag_name={comment.username}
                        size={'s-tag'}
                        link={`/users/${comment.user_id}`}
                        display={'inline'}
                      />
                      <span
                        title={moment(comment.created_at).fromNow(true)}
                        style={{color: '#959ca3 !important'}}
                        className='date fs-body1'
                      >
                        {moment(comment.created_at).fromNow(true)} ago
                      </span>
                    </div>
                    {!auth.loading &&
                      auth.isAuthenticated &&
                      comment.user_id === auth.user.id && (
                        <Link
                          className='s-tag s-tag__moderator'
                          style={{marginTop: '4px'}}
                          title='Delete the comment'
                          onClick={(e) => deleteComment(comment.id)}
                          to={`/questions/${post.id}`}
                        >
                          delete
                        </Link>
                      )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className='add-comment'>
          {!auth.loading && auth.isAuthenticated ? (
            <Fragment>
              <form className='comment-form' onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <input
                    className='title-input s-input'
                    type='text'
                    name='body'
                    value={body}
                    onChange={(e) => handleChange(e)}
                    id='title'
                    placeholder='Leave a comment'
                  />
                </div>
              </form>
            </Fragment>
          ) : (
            <Fragment>
              <LinkButton
                text={'You need to login to add a comment'}
                link={'/login'}
              />
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

CommentCell.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  comment: state.comment,
});

export default connect(mapStateToProps, {
  deleteComment,
  getComments,
  addComment,
})(CommentCell);
