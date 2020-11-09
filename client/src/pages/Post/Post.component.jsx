import React, { useEffect, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../../redux/posts/posts.actions';

import PageTitle from '../../components/pageTitle/pageTitle.component';
import LinkButton from '../../components/LinkButton/LinkButton.component';
import Spinner from '../../components/spinner/spinner.component';
import SideBar from '../../components/sideBar/sideBar.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import AnswerSection from './AnswerSection/AnswerSection.component';
import QuestionSection from './QuestionSection/QuestionSection.component';

import './Post.styles.scss'

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
        // eslint-disable-next-line
    }, [ getPost ]);

    return loading || post === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <PageTitle title={`${post.title} - CLONE Stack Overflow`}/>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='post'>
                    <div className='question-header fc-black-800 pl24'>
                        <h1>{post.title}</h1>
                        <div>
                            <LinkButton
                                text={'Ask Question'}
                                link={'/add/question'}
                                type={'s-btn__primary'}
                            />
                        </div>
                    </div>
                    <div className='question-date fc-black-800 pl24'>
                        <div className='grid-cell'>
                                <span className='fc-light'>
                                    Asked
                                </span>
                            <time dateTime={ moment(post.created_at).fromNow(true) }>
                                { moment(post.created_at).fromNow(true) } ago
                            </time>
                        </div>
                    </div>
                    <div className='question-main pl24 pt16'>
                        <QuestionSection postId={match.params.id}/>
                        <AnswerSection postId={match.params.id}/>
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    </Fragment>
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);