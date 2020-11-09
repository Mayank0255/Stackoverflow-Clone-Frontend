import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CommentCell from './CommentCell/CommentCell.component';
import VoteCell from './VoteCell/VoteCell.component';
import PostCell from './PostCell/PostCell.component';

import './QuestionSection.styles.scss';

const QuestionSection = ({ post: { post: { id, answer_count, comment_count }}, postId}) => {
    return <Fragment>
        <div className='question'>
            <div className='post-layout'>
                <VoteCell
                    answerCount={answer_count}
                    commentCount={comment_count}
                />
                <PostCell postId={postId}/>
                <CommentCell postId={postId} />
            </div>
        </div>
    </Fragment>
}

QuestionSection.propTypes = {
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, null)(QuestionSection);