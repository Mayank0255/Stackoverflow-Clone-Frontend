import React, {useEffect} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getTags } from "../../redux/tags/tags.actions";

import './right-sideBar.styles.scss';

const RightSideBar = ({ getTags , tag: { tags, loading }}) => {
    useEffect(() => {
        getTags();
    }, [getTags]);

    return (
        <div className="sideBar">
            <div className="sideBar-widget">
                <div className="widget-header">
                    The Overflow Blog
                </div>
                <ul className="widget-content">
                    <li>
                        <div className="cell">
                            <Link to='/'>
                                <svg aria-hidden="true" className="svg-icon va-text-top iconPencilSm" width="14"
                                     height="14" viewBox="0 0 14 14">
                                    <path
                                        d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z"/>
                                </svg>
                            </Link>
                        </div>
                        <div className="cell">
                            <Link className="links" to='/'>A practical guide to writing technical specs</Link>
                        </div>
                    </li>
                </ul>
                <ul className="widget-content">
                    <li>
                        <div className="cell">
                            <Link to='/'>
                                <svg aria-hidden="true" className="svg-icon va-text-top iconPencilSm" width="14"
                                     height="14" viewBox="0 0 14 14">
                                    <path
                                        d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z"/>
                                </svg>
                            </Link>
                        </div>
                        <div className="cell">
                            <Link className="links" to='/'>Podcast 224: Cryptocurrency-Based Life Forms</Link>
                        </div>
                    </li>
                </ul>
                <div className="widget-header">
                    Featured on Meta
                </div>
                <ul className="widget-content">
                    <li>
                        <div className="cell">
                            <Link to='/'>
                                <svg aria-hidden="true" className="svg-icon va-text-top iconPencilSm" width="14"
                                     height="14" viewBox="0 0 14 14">
                                    <path
                                        d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z"/>
                                </svg>
                            </Link>
                        </div>
                        <div className="cell">
                            <Link className="links" to='/'>Community and Moderator guidelines for escalating issues via new response…</Link>
                        </div>
                    </li>
                </ul>
                <ul className="widget-content">
                    <li>
                        <div className="cell">
                            <Link to='/'>
                                <svg aria-hidden="true" className="svg-icon va-text-top iconPencilSm" width="14"
                                     height="14" viewBox="0 0 14 14">
                                    <path
                                        d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z"/>
                                </svg>
                            </Link>
                        </div>
                        <div className="cell">
                            <Link className="links" to='/'>Triage needs to be fixed urgently, and users need to be notified upon…</Link>
                        </div>
                    </li>
                </ul>
                <ul className="widget-content">
                    <li>
                        <div className="cell">
                            <Link to='/'>
                                <svg aria-hidden="true" className="svg-icon va-text-top iconPencilSm" width="14"
                                     height="14" viewBox="0 0 14 14">
                                    <path
                                        d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z"/>
                                </svg>
                            </Link>
                        </div>
                        <div className="cell">
                            <Link className="links" to='/'>Technical site integration observational experiment live on Stack Overflow</Link>
                        </div>
                    </li>
                </ul>
                <ul className="widget-content">
                    <li>
                        <div className="cell">
                            <Link to='/'>
                                <svg aria-hidden="true" className="svg-icon va-text-top iconPencilSm" width="14"
                                     height="14" viewBox="0 0 14 14">
                                    <path
                                        d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z"/>
                                </svg>
                            </Link>
                        </div>
                        <div className="cell">
                            <Link className="links" to='/'>Dark Mode Beta - help us root out low-contrast and un-converted bits</Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="sideBar-tags">
                <h4 className="tag-headline">Top Ten Tags</h4>
                {tags.slice(0, 10).map(tag => (
                    <div className="tag-content">
                        <Link className="tag-link" to={`/tags/${tag.tagname}`}>
                            {tag.tagname}
                        </Link>
                        &nbsp;
                        <span className="tag-mult">
                            <span>&times;</span>
                            &nbsp;
                            <span>{tag.posts_count}</span>
                        </span>
                    </div>
                ))}
                <Link className='showtags' to='/tags'>show more tags</Link>
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