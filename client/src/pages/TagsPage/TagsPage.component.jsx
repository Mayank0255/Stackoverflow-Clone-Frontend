import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTags } from '../../redux/tags/tags.actions';

import './TagsPage.styles.scss'
import SideBar from '../../components/SideBar/SideBar.component';
import TagPanel from '../../components/TagPanel/TagPanel.component';
import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

const TagsPage = ({ getTags , tag: { tags, loading }}) => {
    useEffect(() => {
        getTags();
    }, [getTags]);

    return (
        <div className='page'>
            <SideBar/>
            <div className='tagspage'>
                <div className='mainbar'>
                    <h1 className='headline'>Tags</h1>
                    <p className='fs-body'>
                        A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
                    </p>
                    <div className='headline-count'>
                        <span>1,025 tags</span>
                    </div>
                    <div className='user-browser'>
                        <div className='grid-layout'>
                            {tags.map(tag => (
                                <TagPanel key={tag.tagname} tag = {tag}/>))}
                        </div>
                    </div>
                </div>
            </div>
            <RightSideBar/>
        </div>
    )
};

TagsPage.propTypes = {
    getTags: PropTypes.func.isRequired,
    tag: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tag: state.tag
});

export default connect(mapStateToProps,{ getTags})(TagsPage);