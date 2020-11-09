import React, {useEffect, Fragment, useState} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getTagPosts } from '../../redux/posts/posts.actions';
import { getTag } from '../../redux/tags/tags.actions';
import handleSorting from '../../services/handleSorting';

import LinkButton from '../../components/LinkButton/LinkButton.component';
import SideBar from '../../components/sideBar/sideBar.component';
import PostItem from '../../components/postItem/postItem.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import Spinner from '../../components/spinner/spinner.component';
import PageTitle from '../../components/pageTitle/pageTitle.component';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';

import './TagPage.styles.scss';

const TagPage = ({ getTag, getTagPosts, tag, post: { posts, loading }, match  }) => {
    useEffect(() => {
        getTagPosts(match.params.tagname);
        getTag(match.params.tagname)
        // eslint-disable-next-line
    }, [getTag, getTagPosts]);

    const [sortType, setSortType] = useState('Newest');

    if (tag.redirect) {
        return <Redirect to='/tags' />;
    }

    return tag.tag === null || tag.loading || loading ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <PageTitle title={`Questions tagged [${tag.tag.tagname}] - CLONE Stack Overflow`}/>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='questions-page fc-black-800'>
                    <div className='questions-grid'>
                        <h3 className='questions-headline'>Questions tagged [{tag.tag.tagname}]</h3>
                        <div className='questions-btn'>
                            <LinkButton
                                text={'Ask Question'}
                                link={'/add/question'}
                                type={'s-btn__primary'}
                            />
                        </div>
                    </div>
                    <p
                        className='fs-body'
                        dangerouslySetInnerHTML={{ __html: tag.tag.description }}
                    />
                    <div className='questions-tabs'>
                        <span>{new Intl.NumberFormat('en-IN').format(tag.tag.posts_count)} {tag.tag.posts_count === 1 ? 'question' : 'questions'}</span>
                        <ButtonGroup
                            buttons={['Newest', 'Top', 'Views', 'Oldest']}
                            selected={sortType}
                            setSelected={setSortType}
                        />
                    </div>
                    <div className='questions'>
                        {tag.tag.posts_count === 0 ? ( <h4 style={{margin: '30px 30px'}}>There are no questions from this tag</h4> ) :
                            posts
                                ?.sort(handleSorting(sortType))
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
    getTag: PropTypes.func.isRequired,
    getTagPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    tag: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    post: state.post,
    tag: state.tag
});

export default connect(mapStateToProps, { getTagPosts, getTag })(TagPage);