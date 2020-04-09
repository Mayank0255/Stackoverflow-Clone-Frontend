import React, {useEffect,Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTagPosts } from "../../redux/posts/posts.actions";
import { Link } from "react-router-dom";

import SideBar from "../../components/SideBar/SideBar.component";
import PostItem from '../../components/PostItem/PostItem.component';
import RightSideBar from "../../components/right-sideBar/right-sideBar.component";

import './TagPage.styles.scss'


const TagPage = ({ getTagPosts, post: { posts, loading }, match  }) => {
    useEffect(() => {
        getTagPosts(match.params.tagname);
        // eslint-disable-next-line
    }, [getTagPosts]);

    return loading || posts === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className="page">
            <SideBar/>

            <div className='questionspage'>
                <div className='mainbar'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>Questions tagged [{match.params.tagname}]</h3>
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
                        {posts.length === 0 ? ( <h4 style={{margin: "30px 30px"}}>There are no questions from this tag</h4> ) :
                            posts.map(post => (
                                <PostItem key={post.id} post={post} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <RightSideBar/>
        </div>
    </Fragment>


};


TagPage.propTypes = {
    getTagPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getTagPosts })(TagPage);