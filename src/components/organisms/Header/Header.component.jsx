import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../../molecules/Spinner/Spinner.component';
import LinkButton from '../../molecules/LinkButton/LinkButton.component';
import MobileSideBar from '../../organisms/MobileSideBar/MobileSideBar.component';
import { Box, FlexBox } from '../../atoms/box.atom';
import SearchForm from '../../molecules/Search/SearchForm.component';

import { logout } from '../../../redux/auth/auth.actions';

import { Image } from '../../atoms/image.atom';
import { CustomLink } from '../../atoms/link.atom';
import IconLogo from '../../../assets/IconLogo.svg';
import TextLogo from '../../../assets/TextLogo.svg';
import { blue } from '../../../themes';

import './Header.styles.scss';

const Header = ({auth: {isAuthenticated, loading, user}, logout}) => {
  let history = useHistory();

  const authLinks = (
    <FlexBox
      justifyContent="center"
      alignItems="center"
    >
      {loading || user === null ? (
        <Spinner width='50px' height='50px' />
      ) : (
        <CustomLink
          display='flex'
          alignItems='center'
          to={`/users/${user.id}`}
          title={user.username}
        >
          <Image
            height='32px'
            width='32px'
            borderRadius='3px'
            mr='9px'
            alt='user-logo'
            src={user.gravatar}
          />
        </CustomLink>
      )}
      <LinkButton
        text={'Log out'}
        link={'/login'}
        type={'s-btn__filled'}
        handleClick={logout}
      />
    </FlexBox>
  );

  const guestLinks = (
    <FlexBox>
      <LinkButton text={'Log in'} link={'/login'} type={'s-btn__primary'} />
      <LinkButton text={'Sign up'} link={'/register'} type={'s-btn__filled'} />
    </FlexBox>
  );

  return !loading && (
    <FlexBox
      height='80px'
      bg={blue._1100}
      px='16px'
      py='16px'
      alignItems='center'
      boxShadow='2px 4px 4px rgba(0, 0, 0, 0.25)'
    >
      <div className="hamburger">
        <MobileSideBar hasOverlay />
      </div>
      <Box width='234px' minWidth='184px'>
        <Link to='/home'>
          <Image src={IconLogo}/>
          <Image src={TextLogo}/>
        </Link>
      </Box>
      <FlexBox
        width='calc(100% - 234px)'
        justifyContent='space-between'
      >
        <Box px='16px' width='100%'>
          <SearchForm
            name='search'
            placeholder='Search...'
            handleSubmit={() => history.push('/questions')}
          />
        </Box>
        <FlexBox
          maxWidth='300px'
          width='30%'
          minWidth='200px'
          justifyContent='flex-end'
        >
          {!loading && (
            <Box>
              {isAuthenticated ? authLinks : guestLinks}
            </Box>
          )}
        </FlexBox>
      </FlexBox>
    </FlexBox>
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
