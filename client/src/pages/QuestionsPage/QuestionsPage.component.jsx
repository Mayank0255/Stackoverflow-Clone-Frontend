import React, { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../redux/posts/posts.actions';

import LinkButton from '../../components/LinkButton/LinkButton.component';
import SideBar from '../../components/sideBar/sideBar.component';
import PostItem from '../../components/postItem/postItem.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import Spinner from '../../components/spinner/spinner.component';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';
import SearchBox from "../../components/SearchBox/SearchBox.component";
import PageTitle from "../../components/pageTitle/pageTitle.component";

import './QuestionsPage.styles.scss'

const QuestionsPage = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [ getPosts ]);

    const [sortType, setSortType] = useState('Newest');
    let searchQuery = new URLSearchParams(useLocation().search).get('search');

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

    return loading || posts === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        {searchQuery ? <PageTitle title={`Search Results for ${searchQuery} - CLONE Stack Overflow`}/> : ''}
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='questions-page fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>{searchQuery ? 'Search Results' : 'All Questions'}</h3>
                        <div className="questions-btn">
                            <LinkButton
                                text={'Ask Question'}
                                link={'/add/question'}
                                type={'s-btn__primary'}
                            />
                        </div>
                    </div>
                    {searchQuery ? <div className="search-questions">
                        <span style={{color: '#acb2b8', fontSize: '12px'}}>Results for {searchQuery}</span>
                        <SearchBox
                            placeholder={'Search...'}
                            name={'search'}
                            pt={'mt8'}
                        />
                    </div> : ''}
                    <div className='questions-tabs'>
                        <span>19,204,360 questions</span>
                        <ButtonGroup
                            buttons={['Newest', 'Top', 'Views', 'Oldest']}
                            selected={sortType}
                            setSelected={setSortType}
                        />
                    </div>
                    <div className='questions'>
                        {posts
                            .filter(post => post.title.toLowerCase().includes(searchQuery ? searchQuery : ''))
                            ?.sort(handleSorting())
                            .map(post => (
                            <PostItem key={post.id} post={post} />))}
                    </div>
                </div>
                <RightSideBar/>
            </div>
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