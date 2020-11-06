import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTags } from '../../../redux/tags/tags.actions';
import TagBadge from "../../TagBadge/TagBadge.component";

import './TagsWidget.styles.scss';

const TagsWidget = ({ getTags , tag: { tags, loading }}) => {
    useEffect(() => {
        getTags();
    }, [getTags]);

    const numList = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

    return loading || tags.length === 0 ? '' : <Fragment>
        <div className='side-bar-tags'>
            <h4 className='tag-headline'>Top {numList[tags.length - 1]} Tags</h4>
            {tags.slice(0, 10).map(tag => (
                <div key={tag.tagname} className='tag-content'>
                    <TagBadge
                        tag_name={tag.tagname}
                        size={'s-tag s-tag__md'}
                        display={'inline'}
                    />
                    &nbsp;
                    <span className='tag-mult'>
                            <span>&times;</span>
                        &nbsp;
                        <span>{tag.posts_count}</span>
                        </span>
                </div>
            ))}
            <Link className='show-tags' to='/tags'>show more tags</Link>
        </div>
    </Fragment>
}

TagsWidget.propTypes = {
    getTags: PropTypes.func.isRequired,
    tag: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tag: state.tag
});

export default connect(mapStateToProps, { getTags })(TagsWidget);