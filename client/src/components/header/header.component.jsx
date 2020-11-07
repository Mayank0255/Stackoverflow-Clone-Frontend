import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/auth/auth.actions'

import SearchBox from "../SearchBox/SearchBox.component";
import Button from "../Button/Button.component";

import { ReactComponent as Logo } from '../../assets/LogoMd.svg';
import './header.styles.scss';
import Spinner from "../spinner/spinner.component";

const Header = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const authLinks = (
        <div className='btns'>
            {loading || user === null ? <Spinner width='50px' height='50px'/> : <Link to={`/users/${user.id}`} title={user.username}>
                <img alt='user-logo' className='logo'
                     src={`https://secure.gravatar.com/avatar/${user.id}?s=164&d=identicon`}/>
            </Link>}
            <Button
                text={'Log out'}
                link={'/login'}
                type={'s-btn__filled'}
                handleClick={logout}
            />
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
            <Button
                text={'Log in'}
                link={'/login'}
                type={'s-btn__primary'}
            />
            <Button
                text={'Sign up'}
                link={'/register'}
                type={'s-btn__filled'}
            />
        </div>

    );

    return loading ? '' : <Fragment>
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
    </Fragment>
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ logout } )(Header);