import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/stack-overflow.svg';

import './header.styles.scss';

const Header = () => (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
            <Logo className="brandIcon"/>
            stack<strong>overflow</strong>
        </Link>
        <span className="barItems">Products</span>
        <form id="search"
              className="grid--cell fl-grow1 searchbar px12 js-searchbar " autoComplete="off">
            <div className="ps-relative">
                <input name="q"
                       type="text"
                       placeholder="Search…"
                       maxLength="240"
                       className="s-input s-input__search js-search-field "/>
                <i className="gg-search"/>
            </div>
        </form>
        <div className="btns">
            <button type="button" className="btn btn-outline-primary btn-sm">Log in
            </button>
            <button type="button" className="btn btn-primary btn-sm">Sign up</button>
        </div>
    </nav>
);

export default Header;