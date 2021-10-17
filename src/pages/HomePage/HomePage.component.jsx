import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTopPosts } from '../../redux/posts/posts.actions';

import LinkButton from '../../components/LinkButton/LinkButton.component';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/Spinner/Spinner.component';

import './HomePage.styles.scss';
import Pagination from '../../components/Pagination/Pagination';

const itemsPerPage = 12;
const showInline = 5;

const HomePage = ({ getTopPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getTopPosts();
  }, [getTopPosts]);

  const [currentPosts, setCurrentPosts] = useState([]);

  const handlePaginationChange = (currentPage) => {
    setCurrentPosts(
      posts.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage)
    );
  };

  return loading || posts === null ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
    <Fragment>
      <div id="mainbar" className="homepage fc-black-800">
        <div className="questions-grid">
          <h3 className="questions-headline">Top Questions</h3>
          <div className="questions-btn">
            <LinkButton text={'Ask Question'} link={'/add/question'} type={'s-btn__primary'} />
          </div>
        </div>
        <div className="questions-tabs">
          <span>{new Intl.NumberFormat('en-IN').format(posts.length)} questions</span>
        </div>
        <div className="questions">
          {currentPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
        <Pagination
          total={posts.length}
          elementsPerPage={itemsPerPage}
          showInline={showInline}
          handlePaginationChange={(currentPage) => handlePaginationChange(currentPage)}
          hideOnSinglePage={true}
        />
      </div>
    </Fragment>
  );
};

HomePage.propTypes = {
  getTopPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getTopPosts })(HomePage);
