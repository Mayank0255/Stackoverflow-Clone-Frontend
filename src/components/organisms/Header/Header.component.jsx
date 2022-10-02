import React, {Fragment, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../../molecules/Spinner/Spinner.component';
import LinkButton from '../../molecules/LinkButton/LinkButton.component';
import MobileSideBar from '../../organisms/MobileSideBar/MobileSideBar.component';

import { logout } from '../../../redux/auth/auth.actions';

import CustomIcon from '../../molecules/CustomIcon';
import { ReactComponent as Search } from '../../../assets/Search.svg';
import IconLogo from '../../../assets/IconLogo.svg';
import TextLogo from '../../../assets/TextLogo.svg';

import './Header.styles.scss';

const Header = ({auth: {isAuthenticated, loading, user}, logout}) => {
  let history = useHistory();
  const [searchState, setSearchState] = useState(false);

  const authLinks = (
    <div className='btns'>
      {loading || user === null ? (
        <Spinner width='50px' height='50px' />
      ) : (
        <Link to={`/users/${user.id}`} title={user.username}>
          <img
            alt='user-logo'
            className='logo'
            src={user.gravatar}
          />
        </Link>
      )}
      <LinkButton
        text={'Log out'}
        link={'/login'}
        type={'s-btn__filled'}
        handleClick={logout}
      />
    </div>
  );

  const guestLinks = (
    <div className='btns'>
      <LinkButton text={'Log in'} link={'/login'} type={'s-btn__primary'} />
      <LinkButton text={'Sign up'} link={'/register'} type={'s-btn__filled'} />
    </div>
  );

  const SearchBar = () => {
    return (
      <form
        onSubmit={() => history.push('/questions')}
        className='small-search-form'
        autoComplete='off'
      >
          <input
            className='small-search'
            autoComplete='off'
            type='text'
            name='search'
            maxLength='35'
            placeholder='Search...'
          />
          <Search className="small-search-icon" />
      </form>
    );
  }


  return !loading && (
    <Fragment>
      <nav className='navbar navbar-expand-lg navbar-light'>
        <div className="hamburger">
          <MobileSideBar hasOverlay />
        </div>
        <div className='header-brand-div'>
          <Link className='navbar-brand' to='/'>
            <CustomIcon src={IconLogo}/>
            <CustomIcon src={TextLogo}/>
          </Link>
        </div>
          <form
            id='search'
            onSubmit={() => history.push('/questions')}
            className={`grid--cell fl-grow1 searchbar px12 js-searchbar`}
            autoComplete='off'
          >
            <div className='ps-relative search-frame'>
              <input
                className='s-input s-input__search h100 search-box'
                autoComplete='off'
                type='text'
                name='search'
                maxLength='35'
                placeholder='Search...'
              />
              <Search />
            </div>
          </form>
          <div className="header-search-div">
          <Search className="search-icon" onClick={() => setSearchState(!searchState)} />
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </nav>
      {searchState && <SearchBar />}
    </Fragment>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(Header);
