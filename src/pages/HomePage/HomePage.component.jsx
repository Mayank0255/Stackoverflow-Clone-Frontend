import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTopPosts} from '../../redux/posts/posts.actions';

import LinkButton from '../../components/LinkButton/LinkButton.component';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/Spinner/Spinner.component';

import './HomePage.styles.scss';

const HomePage = ({getTopPosts, post: {posts, loading}}) => {
  useEffect(() => {
    getTopPosts();
  }, [getTopPosts]);

  // Example posts

  /* const posts =  [{
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
  }] */

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
        <div className='questions'>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

HomePage.propTypes = {
  getTopPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getTopPosts})(HomePage);
