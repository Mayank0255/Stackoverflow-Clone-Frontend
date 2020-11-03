import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/auth/auth.actions'

import { ReactComponent as Logo } from '../../assets/LogoMd.svg';
import { ReactComponent as Search } from '../../assets/Search.svg';

import './header.styles.scss';
import SearchBox from "../SearchBox/SearchBox.component";

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <div className='btns'>
            <Link onClick={ logout } to='/login'>
                <button type='button' className='s-btn s-btn__filled'>Log out</button>
            </Link>
        </div>
    );

    const authTabs = (
        <div className="s-navigation">
            <Link to='/' className="s-navigation--item is-selected">Products</Link>
        </div>
    );

    const guestTabs = (
        <div className="s-navigation">
            <Link to='/' className="s-navigation--item is-selected">Products</Link>
            <Link to='/' className="s-navigation--item not-selected">Customers</Link>
            <Link to='/' className="s-navigation--item not-selected">Use cases</Link>
        </div>
    );

    const guestLinks = (
        <div className='btns'>
            <Link to='/login'>
                <button type='button' className="s-btn s-btn__primary">Log in</button>
            </Link>
            <Link to='/register'>
                <button type='button' className='s-btn s-btn__filled'>Sign up</button>
            </Link>
        </div>

    );

    return(
        <nav className='navbar fixed-top navbar-expand-lg navbar-light bs-md'>
            <Link className='navbar-brand' to='/'>
                <Logo/>
            </Link>
            {!loading && (
                <Fragment>{isAuthenticated ? authTabs : guestTabs}</Fragment>
            )}
            <SearchBox
                placeholder={'Search...'}
                px={'px12'}
            />
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