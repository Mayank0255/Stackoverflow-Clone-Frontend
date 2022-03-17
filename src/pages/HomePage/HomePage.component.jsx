import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { Pagination, PaginationItem } from "@mui/material";

import {getPosts} from '../../redux/posts/posts.actions';
import LinkButton from '../../components/LinkButton/LinkButton.component';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/Spinner/Spinner.component';
import handleSorting from "../../services/handleSorting";

import './HomePage.styles.scss';

const itemsPerPage = 10;

const HomePage = ({getPosts, post: {posts, loading}}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [page, setPage] = useState(1);

  const handlePaginationChange = (e, value) => setPage(value);
  
  return loading || posts === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <div id='mainbar' className='homepage fc-black-800'>
        <div className='questions-grid'>
          <h3 className='questions-headline'>Top Questions</h3>
          <div className='questions-btn'>
            <LinkButton
              text={'Ask Question'}
              link={'/add/question'}
              type={'s-btn__primary'}
            />
          </div>
        </div>
        <div className='questions-tabs'>
          <span>
            {new Intl.NumberFormat('en-IN').format(posts.length)} questions
          </span>
        </div>
        <div className="questions">
          {posts
            .sort(handleSorting('Top'))
            .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
            .map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </div>
        <Pagination
          style={{ float: 'right', margin: '0 13px 16px 0' }}
          count={Math.ceil(posts.length/itemsPerPage)}
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

HomePage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(HomePage);
