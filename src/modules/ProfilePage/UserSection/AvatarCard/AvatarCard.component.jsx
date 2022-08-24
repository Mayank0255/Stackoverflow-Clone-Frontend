import React from "react";
import {Link} from "react-router-dom";

import './AvatarCard.styles.scss';

const AvatarCard = ({ id, gravatar, views }) => (
  <div className='img-card'>
    <div className='avatar-card'>
      <div className='avatar'>
        <Link className='avatar-link' to={`/users/${id}`}>
          <div className='logo-wrapper'>
            <img
              src={gravatar}
              alt='user-logo'
            />
          </div>
        </Link>
      </div>
      <div className='title'>
        <div className='grid fc-black-800'>
          {views}
          &nbsp;
          <span className='fc-light'>PROFILE VIEWS</span>
        </div>
      </div>
    </div>
  </div>
)

export default AvatarCard;