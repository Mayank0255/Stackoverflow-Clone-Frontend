import React, {useEffect, Fragment, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getTagPosts } from '../../redux/posts/posts.actions';

import LinkButton from "../../components/LinkButton/LinkButton.component";
import SideBar from '../../components/sideBar/sideBar.component';
import PostItem from '../../components/postItem/postItem.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import Spinner from "../../components/spinner/spinner.component";
import PageTitle from "../../components/pageTitle/pageTitle.component";

import './TagPage.styles.scss';
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup.component";

const TagPage = ({ getTagPosts, post: { posts, loading }, match  }) => {
    useEffect(() => {
        getTagPosts(match.params.tagname);
        // eslint-disable-next-line
    }, [getTagPosts]);

    const [sortType, setSortType] = useState('Newest');

    const handleSorting = () => {
        switch (sortType) {
            case 'Newest':
                return (a, b) => new Date(b.created_at) - new Date(a.created_at)
            case 'Top':
                return (a, b) => (b.answer_count + b.comment_count) - (a.answer_count + a.comment_count)
            case 'Views':
                return (a, b) => b.views - a.views
            case 'Oldest':
                return (a, b) => new Date(a.created_at) - new Date(b.created_at)
            default:
                break
        }
    }

    if (posts.length === 0) {
        return <Redirect to='/tags'/>;
    }

    return loading ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <PageTitle title={`Questions tagged [${match.params.tagname}] - CLONE Stack Overflow`}/>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='questions-page fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>Questions tagged [{match.params.tagname}]</h3>
                        <div className='questions-btn'>
                            <LinkButton
                                text={'Ask Question'}
                                link={'/add/question'}
                                type={'s-btn__primary'}
                            />
                        </div>
                    </div>
                    <p className='fs-body'>{posts[0].description ? posts[0].description : ''}</p>
                    <div className='questions-tabs'>
                        <span>19,204,360 questions</span>
                        <ButtonGroup
                            buttons={['Newest', 'Top', 'Views', 'Oldest']}
                            selected={sortType}
                            setSelected={setSortType}
                        />
                    </div>
                    <div className='questions'>
                        {posts.length === 0 ? ( <h4 style={{margin: '30px 30px'}}>There are no questions from this tag</h4> ) :
                            posts
                                ?.sort(handleSorting())
                                .map(post => (
                                <PostItem key={post.id} post={post} />
                            ))
                        }
                    </div>
                </div>
                <RightSideBar/>
            </div>
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