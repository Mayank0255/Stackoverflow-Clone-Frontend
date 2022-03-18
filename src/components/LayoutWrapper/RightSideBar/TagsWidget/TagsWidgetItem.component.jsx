import React, {Fragment} from "react";

import TagBadge from "../../../TagBadge/TagBadge.component";

import './TagsWidgetItem.styles.scss';

const TagsWidgetItem = ({ tagname, posts_count }) => {
  return <Fragment>
    <div className='tag-content'>
      <TagBadge
        tag_name={tagname}
        size={'s-tag s-tag__md'}
        display={'inline'}
        href={true}
      />
      &nbsp;
      <span className='tag-mult'>
        <span>&times;</span>
        &nbsp;
        <span>{posts_count}</span>
      </span>
    </div>
  </Fragment>
}

export default TagsWidgetItem;