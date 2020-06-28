import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/auth/auth.actions'

import { ReactComponent as Logo } from '../../assets/stack-overflow.svg';
// import { ReactComponent as Brand } from '../../assets/stack-exchange.svg';

import './header.styles.scss';

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
        <div className='btns'>
            <Link onClick={logout} to='/login'>
                <button type='button' className='btn btn-outline-primary btn-sm'>Log out</button>
            </Link>
        </div>
    );

    const authTabs = (
        <div>
            <span className='barItems'>Products</span>
        </div>
    );

    const guestTabs = (
        <div>
            <span className='barItems'>Products</span>
            <span className='barItems'>Customers</span>
            <span className='barItems'>Use cases</span>
        </div>
    );

    const guestLinks = (
        <div className='btns'>
            <Link to='/login'>
                <button type='button' className='btn btn-outline-primary btn-sm'>Log in</button>
            </Link>
            <Link to='/register'>
                <button type='button' className='btn btn-primary btn-sm'>Sign up</button>
            </Link>
        </div>

    );

    return(
        <nav className='navbar fixed-top navbar-expand-lg navbar-light'>
            <a className='navbar-brand' href='/'>
                <Logo className='brandIcon'/>
                stack<strong>overflow</strong>
            </a>
            {!loading && (
                <Fragment>{isAuthenticated ? authTabs : guestTabs}</Fragment>
            )}
            <form id='search'
                  className='grid--cell fl-grow1 searchbar px12 js-searchbar ' autoComplete='off'>
                <div className='ps-relative'>
                    <input name='q'
                           type='text'
                           placeholder='Search…'
                           maxLength='240'
                           className='s-input s-input__search js-search-field '/>
                    <i className='gg-search'/>
                </div>
            </form>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}

        </nav>
    )
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ logout } )(Header);