import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../../../redux/posts/posts.actions';

import CommentCell from './CommentCell/CommentCell.component';
import VoteCell from './VoteCell/VoteCell.component';
import PostCell from './PostCell/PostCell.component';

import './QuestionSection.styles.scss';

const QuestionSection = ({ post: { post: { id, answer_count, comment_count }}}) => {
    useEffect(() => {
        getPost(id);
        // eslint-disable-next-line
    }, [ getPost ]);

    return <Fragment>
        <div className='question'>
            <div className='post-layout'>
                <VoteCell
                    answerCount={answer_count}
                    commentCount={comment_count}
                />
                <PostCell/>
                <CommentCell postId={id} />
            </div>
        </div>
    </Fragment>
}

QuestionSection.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(QuestionSection);