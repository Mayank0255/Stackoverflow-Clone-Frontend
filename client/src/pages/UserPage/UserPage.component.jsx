import React, {useEffect,Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../redux/users/users.actions';
import { Link } from 'react-router-dom';
import timeAgo from '../../utils/timeAgo.utils';

import { ReactComponent as Logo } from '../../assets/stack-overflow.svg';

import SideBar from '../../components/SideBar/SideBar.component';
import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

import './UserPage.styles.scss'


const UserPage = ({ getUser, user: { user, loading }, match  }) => {
    useEffect(() => {
        getUser(match.params.id);
        // eslint-disable-next-line
    }, [getUser]);

    return loading || user === null ? <Fragment>Loading...</Fragment> : <Fragment>
        <div className='page'>
            <SideBar/>
            <div className='userpage'>
                <div className='user-mainbar'>
                    <div className='user-card'>
                        <div className='grid'>
                            <div className='img-card'>
                                <div className='avatar-card'>
                                    <div className='avatar'>
                                        <Link className='avatar-link' to={`/users/${user.id}`}>
                                            <div className='logo-wrapper'>
                                                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEXw8PDdy4Xx8vXcyX7s6Nzg0prr59jh05/cyHvt6t/f0JXbx3bx8/fdy4Pj16vv7uzezIro4cj87/UvAAACA0lEQVR4nO3cYU7CUBCFUYRWWrSo+9+sS+BOMg9e9HwLmM5p4BdkTidJkiRJkvRH+1r6+koeuPc9b4+Ey8elq4/34Hnndet63nY7R8LLW1eXSHg9up53rISE1QgJqxES1iMkrEZIWI+QsBohYT1CwmqEhPUICasREtYjJKxGSFiP8FXC7UiKhMvn+WGfmTBaKhPutzXoO1nrWK9B2ahoq3skPD1+7b0vvu/jcM6A2Vvo+/JkRV/pzggJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQn/jzD8lbtT2PcLdnQ1Yl+z3/GTSwjZpJ/kuETn1YhwrffHLX0v6xVXI4InNn7g/SeKsB4hYTVCwnqEhNUICesRElYjJKxHSFiNkLAeIWE1QsJ6hITVCAnrEc4tTE4JbJnw0nWWoFX4nRxxuC2J8B6Nyq5U9AmPte+IQ3SlYs+26hQ2nqB49laEhGMiJBw1qy9CwlGz+iIkHDWrL0LCUbP6IiQcNasvQsJRs/oiJBw1qy9CwlGz+iIkHDWrL0LCUbP6InyRMDpAkZ16mFQYHaDITj3MKpxy1KRrERLOvxYh4fxrERLOvxYh4fxrERLOvxYh4fxrERLOvxYh4fxrERLOvxYh4fxrERLOv1arcEuOOGRrTTnqtN+SKw73ZNaco7IrDo0HIZ4/SpIkSZKkP9gvDI+byX8+aAgAAAAASUVORK5CYII=' alt='user-logo'/>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='title'>
                                        <div className='grid'>
                                            319
                                            &nbsp;
                                            <span>
                                                REPUTATION
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
                                                    user created on&nbsp;-&nbsp;{timeAgo(user.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='stats-cell'>
                                        <div className='count-sec'>
                                            <div className='counts'>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head'>
                                                            {user.answer_count}
                                                        </div>
                                                        <div className='foot'>
                                                            answers
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head'>
                                                            {user.post_count}
                                                        </div>
                                                        <div className='foot'>
                                                            questions
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head'>
                                                            {user.comment_count}
                                                        </div>
                                                        <div className='foot'>
                                                            comments
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='cells'>
                                                    <div className='column-grid'>
                                                        <div className='head'>
                                                            {user.tag_count}
                                                        </div>
                                                        <div className='foot'>
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
                        <div className='grid--cell1'>
                            <div className='cell-layout'>
                                <div className='community'>
                                    <h3>
                                        <span className='icon'>
                                            <svg aria-hidden='true' className='svg-icon native iconLogoSEXxs' width='18' height='18' viewBox='0 0 18 18'>
                                                <path d='M3 4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2H3z' fill='#8FD8F7'/>
                                                <path d='M15 11H3c0 1.1.9 2 2 2h5v3l3-3a2 2 0 0 0 2-2z' fill='#155397'/>
                                                <path fill='#46A2D9' d='M3 5h12v2H3z'/><path fill='#2D6DB5' d='M3 8h12v2H3z'/>
                                            </svg>
                                        </span>
                                        <span className='text'>Communities</span>
                                    </h3>
                                    <ul>
                                        <li className='item'><a href='/'>
                                            <span><Logo className='logo'/></span>
                                            <span>StackOverflow</span>
                                        </a></li>
                                    </ul>
                                </div>
                                <div className='user-posts'>
                                    <h3>
                                        Top network posts
                                    </h3>
                                    <p>
                                        We respect a laser-like focus on one topic.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='grid--cell2'>
                            <div className='top-tags'>
                                <h3>
                                    Top Tags
                                </h3>
                                <div className='top-tags-sec'>
                                    <div className='top-tags-cells'>
                                        <div className='top-cell'>
                                            <div className='tag-cell'>
                                                <a href='/tags/java'>
                                                    java
                                                </a>
                                                <div className='score'>
                                                    <div className='score-txt'>
                                                        <div className='score-tab'>
                                                            <span className='txt'>Posts</span>
                                                            <span className='number'>2</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='top-tags-cells'>
                                        <div className='top-cell'>
                                            <div className='tag-cell'>
                                                <a href='/tags/node.js'>
                                                    node.js
                                                </a>
                                                <div className='score'>
                                                    <div className='score-txt'>
                                                        <div className='score-tab'>
                                                            <span className='txt'>Posts</span>
                                                            <span className='number'>1</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='top-tags-cells'>
                                        <div className='top-cell'>
                                            <div className='tag-cell'>
                                                <a href='/tags/react'>
                                                    react
                                                </a>
                                                <div className='score'>
                                                    <div className='score-txt'>
                                                        <div className='score-tab'>
                                                            <span className='txt'>Posts</span>
                                                            <span className='number'>0</span>
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
            </div>
            <RightSideBar/>
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