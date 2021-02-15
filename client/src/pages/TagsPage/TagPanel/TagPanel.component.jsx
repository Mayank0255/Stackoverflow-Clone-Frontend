import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TagBadge from '../../../components/TagBadge/TagBadge.component';

import './TagPanel.styles.scss';

const TagPanel = ({tag: {tagname, description, created_at, posts_count}}) => {
  return (
    <div className='tag-card'>
      <div className='grid'>
        <TagBadge tag_name={tagname} size={'s-tag'} float={'left'} />
      </div>
      <div className='description'>{description}</div>
      <div className='tag-caption'>
        <div className='tag-cell'>
          {posts_count} {posts_count === 1 ? 'question' : 'questions'}
        </div>
        <div className='tag-cell'>
          added {moment(created_at).fromNow(false)}
        </div>
      </div>
    </div>
  );
};

TagPanel.propTypes = {
  tag: PropTypes.object.isRequired,
};

export default connect(null)(TagPanel);
