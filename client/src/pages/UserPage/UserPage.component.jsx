import React, {useEffect, Fragment} from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../redux/users/users.actions';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/LogoGlyphMd.svg';

import SideBar from '../../components/sideBar/sideBar.component';
import RightSideBar from '../../components/rightSideBar/rightSideBar.component';
import PageTitle from '../../components/pageTitle/pageTitle.component';
import Spinner from '../../components/spinner/spinner.component';
import TagBadge from '../../components/TagBadge/TagBadge.component';

import './UserPage.styles.scss'

const UserPage = ({ getUser, user: { user, loading }, match  }) => {
    useEffect(() => {
        getUser(match.params.id);
        // eslint-disable-next-line
    }, [getUser]);

    return loading || user === null ? <Spinner type='page' width='75px' height='200px'/> : <Fragment>
        <PageTitle title={`User ${user.username} - CLONE Stack Overflow`}/>
        <div className='page'>
            <SideBar/>
            <div id="content">
                <div id='mainbar' className='user-main-bar pl24 pt24'>
                    <div className='user-card'>
                        <div className="grid--cell s-navigation mb16">
                            <Link to="#" className="s-navigation--item is-selected"
                               data-shortcut="P">Profile</Link>
                            <Link to="#" className="s-navigation--item"
                               data-shortcut="A">Activity</Link>
                        </div>
                        <div className='grid'>
                            <div className='img-card'>
                                <div className='avatar-card'>
                                    <div className='avatar'>
                                        <Link className='avatar-link' to={`/users/${user.id}`}>
                                            <div className='logo-wrapper'>
                                                <img src={`https://secure.gravatar.com/avatar/${user.id}?s=164&d=identicon`} alt='user-logo'/>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='title'>
                                        <div className='grid fc-black-800'>
                                            {user.views}
                                            &nbsp;
                                            <span className='fc-light'>
                                                PROFILE VIEWS
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='content-card'>
                                <div className='content-grid'>
                                    <div className='info-cell'>
                                        <div className='info'>
                                            <div className='details'>
                                                <h2>{user.username}</h2>
                                            </div>
                                            <div className='date'>
                                                <p>
                                                    user created &nbsp;-&nbsp;{moment(user.created_at).fromNow(false)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='stats-cell'>
                                        <div className='count-sec'>
                                            <div className='counts'>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head fc-black-700'>
                                                            {user.answer_count}
                                                        </div>
                                                        <div className='foot fc-black-500'>
                                                            answers
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head fc-black-700'>
                                                            {user.post_count}
                                                        </div>
                                                        <div className='foot fc-black-500'>
                                                            questions
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head fc-black-700'>
                                                            {user.comment_count}
                                                        </div>
                                                        <div className='foot fc-black-500'>
                                                            comments
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head fc-black-700'>
                                                            {user.tag_count}
                                                        </div>
                                                        <div className='foot fc-black-500'>
                                                            tags
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row-grid'>
                        <div className='grid-cell1'>
                            <div className='cell-layout'>
                                <div className='community'>
                                    <h3 className='bc-black-3'>
                                        <span className='icon'>
                                            <svg aria-hidden='true' className='svg-icon native icon-logo-sex' width='18' height='18' viewBox='0 0 18 18'>
                                                <path d='M3 4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2H3z' fill='#8FD8F7'/>
                                                <path d='M15 11H3c0 1.1.9 2 2 2h5v3l3-3a2 2 0 0 0 2-2z' fill='#155397'/>
                                                <path fill='#46A2D9' d='M3 5h12v2H3z'/><path fill='#2D6DB5' d='M3 8h12v2H3z'/>
                                            </svg>
                                        </span>
                                        <span className='text fw-bold fc-dark bc-black-3'>Communities</span>
                                    </h3>
                                    <ul>
                                        <li className='item'><Link to='/'>
                                            <span><Logo className='logo'/></span>
                                            <span className='fc-blue-600 fs-body2'>Stack Overflow</span>
                                        </Link></li>
                                    </ul>
                                </div>
                                <div className='user-posts'>
                                    <h3 className='fw-bold fc-dark bc-black-3'>
                                        Top network posts
                                    </h3>
                                    <p className='fc-light'>
                                        We respect a laser-like focus on one topic.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='grid-cell2'>
                            <div className='top-tags'>
                                <h3 className='fw-bold fc-dark bc-black-3'>
                                    Top Tags
                                </h3>
                                <div className='top-tags-sec'>
                                    <div className='top-tags-cells'>
                                        <div className='top-cell'>
                                            <div className='tag-cell bg-black-025'>
                                                <TagBadge
                                                    tag_name={'java'}
                                                    size={'s-tag s-tag__lg'}
                                                    float={'left'}
                                                />
                                                <div className='score'>
                                                    <div className='score-txt'>
                                                        <div className='score-tab'>
                                                            <span className='txt fc-light'>Posts</span>
                                                            <span className='number fc-black-800'>2</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='top-tags-cells'>
                                        <div className='top-cell'>
                                            <div className='tag-cell bg-black-025'>
                                                <TagBadge
                                                    tag_name={'node.js'}
                                                    size={'s-tag s-tag__md'}
                                                    float={'left'}
                                                />
                                                <div className='score'>
                                                    <div className='score-txt'>
                                                        <div className='score-tab'>
                                                            <span className='txt fc-light'>Posts</span>
                                                            <span className='number fc-black-800'>1</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='top-tags-cells'>
                                        <div className='top-cell'>
                                            <div className='tag-cell bg-black-025'>
                                                <TagBadge
                                                    tag_name={'react'}
                                                    size={'s-tag s-tag__md'}
                                                    float={'left'}
                                                />
                                                <div className='score'>
                                                    <div className='score-txt'>
                                                        <div className='score-tab'>
                                                            <span className='txt fc-light'>Posts</span>
                                                            <span className='number fc-black-800'>0</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <RightSideBar/>
            </div>
        </div>
    </Fragment>
};

UserPage.propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, { getUser })(UserPage);