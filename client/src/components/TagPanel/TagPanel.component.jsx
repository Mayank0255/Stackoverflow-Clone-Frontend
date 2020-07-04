import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import timeAgo from "../../services/timeAgo.service";

import './TagPanel.styles.scss';

const TagPanel = ({ tag: {tagname, created_at, posts_count} }) => {
    return (
        <div className='tag-card'>
            <div className='grid'>
                <div className='grid-cell'>
                    <a href={`/tags/${ tagname }`}>{ tagname }</a>
                </div>
            </div>
            <div className='caption'>
                <div>
                    {posts_count} questions
                </div>
                <div>
                    added { timeAgo(created_at) }
                </div>
            </div>
        </div>
    )
};

TagPanel.propTypes = {
    tag: PropTypes.object.isRequired
};

export default connect(null)(TagPanel);