import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TagBadge from '../../../components/molecules/TagBadge/TagBadge.component';

const TagPanel = ({tag: {tagname, description, created_at, posts_count}}) => {
  return (
    <div className="grid--item s-card js-tag-cell d-flex fd-column">
      <div className="d-flex jc-space-between ai-center mb12">
        <TagBadge tag_name={tagname} size={'s-tag'} float={'left'} />
      </div>

      <div className="flex--item fc-medium mb12 v-truncate4">
        {description}
      </div>

      <div className="mt-auto d-flex jc-space-between fs-caption fc-black-400">
        <div className="flex--item">{posts_count} {posts_count === 1 ? 'question' : 'questions'}</div>
        <div className="flex--item s-anchors s-anchors__inherit">
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
