import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getPosts} from '../../redux/posts/posts.actions';
import LinkButton from '../../components/molecules/LinkButton/LinkButton.component';
import PostItem from '../../components/PostItem/PostItem.component';
import Spinner from '../../components/molecules/Spinner/Spinner.component';
import handleSorting from "../../services/handleSorting";
import Pagination from "../../components/Pagination/Pagination.component";
import ButtonGroup from '../../components/molecules/ButtonGroup/ButtonGroup.component';
import handleFilter from '../../services/handleFilter'

import './HomePage.styles.scss';

const itemsPerPage = 10;

const HomePage = ({getPosts, post: {posts, loading}}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('Month')

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
          <div className="btns-filter">
            <ButtonGroup
              buttons={['Today', 'Week', 'Month', 'Year']}
              selected={sortType}
              setSelected={setSortType}
            />
          </div>
        </div>
        <div className="questions">
          <div className="postQues">
            {posts
              .sort(handleSorting(sortType))
              .filter(handleFilter(sortType))
              .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
              .map((post, index) => (
                <PostItem key={index} post={post} />
              ))}
          </div>
        </div>
        <Pagination
          page={page}
          itemList={posts
            .sort(handleSorting(sortType))
            .filter(handleFilter(sortType))}
          itemsPerPage={itemsPerPage}
          handlePaginationChange={handlePaginationChange}
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
