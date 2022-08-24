import React from "react";
import {Link} from "react-router-dom";

import {ReactComponent as StackExchangeLogo} from "../../../assets/StackExchange.svg";
import {ReactComponent as Logo} from "../../../assets/LogoGlyphMd.svg";

import './ExternalUserDetails.styles.scss';

const ExternalUserDetails = () => (
  <div className='grid-cell1'>
    <div className='cell-layout'>
      <div className='community'>
        <h3 className='bc-black-3'>
          <span className='icon'>
            <StackExchangeLogo/>
          </span>
          <span className='text fw-bold fc-dark bc-black-3'>
            Communities
          </span>
        </h3>
        <ul>
          <li className='item'>
            <Link to='/'>
              <span>
                <Logo className='logo' />
              </span>
              <span className='fc-blue-600 fs-body2'>
                Stack Overflow
              </span>
            </Link>
          </li>
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
)

export default ExternalUserDetails;