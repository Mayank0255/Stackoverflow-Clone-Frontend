import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './TagBadge.styles.scss';

<<<<<<< HEAD
const TagBadge = ({tag_name, size, display, link, href}) => {
  return (
    <Fragment>
      <div className='tags-badge' style={{ display }}>
=======
const TagBadge = ({ tag_name, size, display, link, href }) => {
  return (
    <Fragment>
        <div className='tags-badge' style={{ display }}>
>>>>>>> origin/burhanraja
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
