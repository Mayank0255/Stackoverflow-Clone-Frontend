import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/auth/auth.actions'

import { ReactComponent as Logo } from '../../assets/LogoMd.svg';

import './header.styles.scss';

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <div className='btns'>
            <Link onClick={ logout } to='/login'>
                <button type='button' className='btn btn-outline-primary btn-sm'>Log out</button>
            </Link>
        </div>
    );

    const authTabs = (
        <div className="s-navigation">
            <a href='/' className="s-navigation--item">Products</a>
        </div>
    );

    const guestTabs = (
        <div className="s-navigation">
            <a href='/' className="s-navigation--item is-selected">Products</a>
            <a href='/' className="s-navigation--item">Customers</a>
            <a href='/' className="s-navigation--item">Use cases</a>
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
                <Logo/>
            </a>
            {!loading && (
                <Fragment>{isAuthenticated ? authTabs : guestTabs}</Fragment>
            )}
            <form id='search'
                  className='fl-grow1 search-bar px12' autoComplete='off'>
                <div className='ps-relative'>
                    <input name='q'
                           type='text'
                           placeholder='Search…'
                           maxLength='240'
                           className='s-input s-input-search js-search-field '/>
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