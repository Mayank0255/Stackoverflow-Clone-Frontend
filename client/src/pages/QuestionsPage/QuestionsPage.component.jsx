import React, {useEffect,Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../redux/posts/posts.actions';
import { Link } from 'react-router-dom';

import SideBar from '../../components/SideBar/SideBar.component';
import PostItem from '../../components/PostItem/PostItem.component';
import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

import './QuestionsPage.styles.scss'


const QuestionsPage = ({ getPosts, post: { posts, loading }  }) => {
    useEffect(() => {
        getPosts();
    }, [ getPosts ]);

    return loading || posts === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className='page'>
            <SideBar/>

            <div className='questions-page'>
                <div className='main-bar'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>All Questions</h3>
                        <div className='questions-btn'>
                            <Link to='/add/question'>
                                <button className = 'btn btn-sm btn-primary'>Ask Question</button>
                            </Link>
                        </div>
                    </div>
                    <div className='questions-tabs'>
                        <span>19,204,360 questions</span>
                    </div>
                    <div className='questions'>
                        {posts.map(post => (
                            <PostItem key={post.id} post={post} />))}
                    </div>
                </div>
            </div>
            <RightSideBar/>
        </div>
        </Fragment>
};


QuestionsPage.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(QuestionsPage);