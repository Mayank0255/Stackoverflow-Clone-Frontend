import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import './TagBadge.styles.scss';

const TagBadge = ({tag_name, size, display, link, href}) => {
  return (
    <Fragment>
      <div className='tags-badge' style={{ display }}>
          {href === true ? (
            <Link className={`${size}`} to={link ? link : `/tags/${tag_name}`}>
              {tag_name}
            </Link>
          ) : (
            <Link className={`${size}`} to={link ? link : `/tags/${tag_name}`}>
              {tag_name}
            </Link>
          )}
        </div>
    </Fragment>
  );
};

export default TagBadge;
