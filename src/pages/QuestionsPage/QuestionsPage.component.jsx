import React, {Fragment, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../../redux/posts/posts.actions';
import handleSorting from '../../services/handleSorting';

import LinkButton from '../../components/LinkButton/LinkButton.component';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/Spinner/Spinner.component';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';
import SearchBox from '../../components/SearchBox/SearchBox.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';

import './QuestionsPage.styles.scss';

const QuestionsPage = ({getPosts, post: {posts0, loading}}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [sortType, setSortType] = useState('Newest');
  let searchQuery = new URLSearchParams(useLocation().search).get('search');

  let po = {
    id: 1,
    title: "Waka",
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum ipsa aspernatur accusamus aperiam culpa optio esse. Excepturi non libero nulla assumenda, dolore nam consequuntur nihil accusamus sapiente! Fugit, esse neque!",
    tagname: "Shikai",
    username: "Bankai",
    user_id: "Tatara",
    answer_count: 3,
    comment_count: 6,
    views: 6942,
    created_at: "2021-12-05",
  }
  const posts =  [po,po,po]

  return loading || posts === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      {searchQuery ? (
        <PageTitle
          title={`Search Results for ${searchQuery} - CLONE Stack Overflow`}
        />
      ) : (
        ''
      )}
      <div id='mainbar' className='questions-page fc-black-800'>
        <div className='questions-grid'>
          <h3 className='questions-headline'>
            {searchQuery ? 'Search Results' : 'All Questions'}
          </h3>
          <div className='questions-btn'>
            <LinkButton
              text={'Ask Question'}
              link={'/add/question'}
              type={'s-btn__primary'}
            />
          </div>
        </div>
        {searchQuery ? (
          <div className='search-questions'>
            <span style={{color: '#acb2b8', fontSize: '12px'}}>
              Results for {searchQuery}
            </span>
            <SearchBox placeholder={'Search...'} name={'search'} pt={'mt8'} />
          </div>
        ) : (
          ''
        )}
        <div className='questions-tabs'>
          <span>
            {new Intl.NumberFormat('en-IN').format(posts.length)} questions
          </span>
          <ButtonGroup
            buttons={['Newest', 'Top', 'Views', 'Oldest']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
        <div className='questions'>
          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(searchQuery ? searchQuery : '')
            )
            ?.sort(handleSorting(sortType))
            .map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

QuestionsPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPosts})(QuestionsPage);
