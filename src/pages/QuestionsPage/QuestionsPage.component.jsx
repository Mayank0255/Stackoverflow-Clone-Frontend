import React, {Fragment, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../../redux/posts/posts.actions';
import handleSorting from '../../services/handleSorting';

import { Pagination, PaginationItem } from "@mui/material";

import LinkButton from '../../components/LinkButton/LinkButton.component';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/Spinner/Spinner.component';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';
import SearchBox from '../../components/SearchBox/SearchBox.component';
import PageTitle from '../../components/PageTitle/PageTitle.component';

import './QuestionsPage.styles.scss';

const itemsPerPage = 10;

const QuestionsPage = ({getPosts, post: {posts, loading}}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('Newest');

  let searchQuery = new URLSearchParams(useLocation().search).get('search');

  const handlePaginationChange = (e, value) => setPage(value);

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
            .filter((post) => post.title.toLowerCase().includes(searchQuery ? searchQuery : ''))
            ?.sort(handleSorting(sortType))
            .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
            .map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
        </div>
        <Pagination
          style={{ float: 'right', margin: '0 13px 16px 0' }}
          count={Math.ceil(posts.filter((post) => post.title.toLowerCase().includes(searchQuery ? searchQuery : '')).length/itemsPerPage)}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationChange}
          renderItem={(item) => (
            <PaginationItem {...item} sx={{ color: '#cfd2d6', border: '1px solid #4c4f52' }}/>
          )}
        />
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
