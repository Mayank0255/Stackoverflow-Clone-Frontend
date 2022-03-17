import React, {useEffect, Fragment, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTags} from '../../redux/tags/tags.actions';
import handleSorting from '../../services/handleSorting';

import { Pagination, PaginationItem } from '@mui/material';

import TagPanel from './TagPanel/TagPanel.component';
import Spinner from '../../components/Spinner/Spinner.component';
import SearchBox from '../../components/SearchBox/SearchBox.component';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup.component';

import './AllTagsPage.styles.scss';

const itemsPerPage = 12;

const AllTagsPage = ({getTags, tag: {tags, loading}}) => {
  useEffect(() => {
    getTags();
  }, [getTags]);

  const [page, setPage] = useState(1);
  const [fetchSearch, setSearch] = useState('');
  const [sortType, setSortType] = useState('Popular');

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1)
  };

  const handlePaginationChange = (e, value) => setPage(value);

  return loading || tags === null ? (
    <Spinner type='page' width='75px' height='200px' />
  ) : (
    <Fragment>
      <div id='mainbar' className='tags-page fc-black-800'>
        <h1 className='headline'>Tags</h1>
        <p className='fs-body'>
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using the right tags makes it easier for others to
          find and answer your question.
        </p>
        <div className='headline-count'>
          <span>{new Intl.NumberFormat('en-IN').format(tags.length)} tags</span>
        </div>
        <div className='tags-box pl16 pr16 pb16'>
          <SearchBox
            placeholder={'filter by tag name'}
            handleChange={handleChange}
            width={'200px'}
          />
          <ButtonGroup
            buttons={['Popular', 'Name', 'New']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
        <div className='user-browser'>
          <div className='grid-layout'>
            {tags
              .filter((tag) =>
                tag.tagname.toLowerCase().includes(fetchSearch.toLowerCase())
              )
              ?.sort(handleSorting(sortType))
              .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
              .map((tag, index) => (
                <TagPanel key={index} tag={tag} />
              ))}
          </div>
        </div>
        <Pagination
          count={Math.ceil(tags.filter((tag) => tag.tagname.toLowerCase().includes(fetchSearch.toLowerCase())).length/itemsPerPage)}
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

AllTagsPage.propTypes = {
  getTags: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tag: state.tag,
});

export default connect(mapStateToProps, {getTags})(AllTagsPage);
