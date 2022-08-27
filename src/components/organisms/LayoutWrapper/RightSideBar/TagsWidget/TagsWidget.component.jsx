import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {getTags} from '../../../../../redux/tags/tags.actions';
import TagsWidgetItem from "./TagsWidgetItem.component";

import './TagsWidget.styles.scss';

const TagsWidget = ({getTags, tag: {tags, loading}}) => {
  useEffect(() => {
    getTags();
  }, [getTags]);

  const numList = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
  ];

  return loading || tags.length === 0 ? (
    ''
  ) : (
    <Fragment>
      <div className='side-bar-tags'>
        <h4 className='tag-headline'>Top {numList[tags.length - 1]} Tags</h4>
        {tags.slice(0, 10).map((tag, index) => (
          <TagsWidgetItem key={index} tagname={tag.tagname} posts_count={tag.posts_count}/>
        ))}
        <Link className='show-tags' to='/tags'>
          show more tags
        </Link>
      </div>
    </Fragment>
  );
};

TagsWidget.propTypes = {
  getTags: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tag: state.tag,
});

export default connect(mapStateToProps, {getTags})(TagsWidget);
