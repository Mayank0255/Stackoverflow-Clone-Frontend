import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getTopPosts } from '../../redux/posts/posts.actions';

import SideBar from '../../components/sideBar/sideBar.component';
import PostItem from '../../components/postItem/postItem.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';

import Spinner from '../../components/spinner/spinner.component';
import './HomePage.styles.scss';

const HomePage = ({ getTopPosts, post: { posts, loading }  }) => {
    useEffect(() => {
        getTopPosts();
    }, [ getTopPosts ]);

    return loading || posts === null ? <Spinner type='page'/> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='homepage fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>Top Questions</h3>
                        <div className='questions-btn'>
                            <Link to='/add/question'>
                                <button className = 's-btn s-btn__primary'>Ask Question</button>
                            </Link>
                        </div>
                    </div>
                    <div className='questions-tabs'>
                        <span>19,204,360 questions</span>
                    </div>
                    <div className='questions'>
                        {posts.map(post => (
                            <PostItem key={post.id} post={post}/>))}
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    </Fragment>
};

HomePage.propTypes = {
    getTopPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getTopPosts })(HomePage);