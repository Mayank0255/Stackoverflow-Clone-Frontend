import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './TagPanel.styles.scss';

const TagPanel = ({ tag: {tagname, description, created_at, posts_count} }) => {
    console.log(description)
    return (
        <div className='tag-card'>
            <div className='grid'>
                <div className='grid-cell'>
                    <Link className='s-tag' to={`/tags/${ tagname }`}>{ tagname }</Link>
                </div>
            </div>
            <div className="description">{description}</div>
            <div className='tag-caption'>
                <div className='tag-cell'>
                    {posts_count} questions
                </div>
                <div className='tag-cell'>
                    added { moment(created_at).fromNow(true) } ago
                </div>
            </div>
        </div>
    )
};

TagPanel.propTypes = {
    tag: PropTypes.object.isRequired
};

export default connect(null)(TagPanel);