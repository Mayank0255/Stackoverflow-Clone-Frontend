import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getTags } from '../../redux/tags/tags.actions';

import TagBadge from '../TagBadge/TagBadge.component';
import SideBarWidget from './SideBarWidget.component';

import './rightSideBar.styles.scss';

const RightSideBar = ({ getTags , tag: { tags, loading }}) => {
    useEffect(() => {
        getTags();
    }, [getTags]);

    return (
        <div id='sidebar' className='side-bar'>
            <SideBarWidget/>
            <div className='side-bar-tags'>
                <h4 className='tag-headline'>Top Ten Tags</h4>
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
        </div>
    )
};

RightSideBar.propTypes = {
    getTags: PropTypes.func.isRequired,
    tag: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tag: state.tag
});

export default connect(mapStateToProps, { getTags })(RightSideBar);