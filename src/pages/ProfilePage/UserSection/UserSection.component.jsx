import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";

import './UserSection.styles.scss';

const UserSection = ({ user }) => (
  <div className='grid'>
    <div className='img-card'>
      <div className='avatar-card'>
        <div className='avatar'>
          <Link className='avatar-link' to={`/users/${user.id}`}>
            <div className='logo-wrapper'>
              <img
                src={user.gravatar}
                alt='user-logo'
              />
            </div>
          </Link>
        </div>
        <div className='title'>
          <div className='grid fc-black-800'>
            {user.views}
            &nbsp;
            <span className='fc-light'>PROFILE VIEWS</span>
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
                user created &nbsp;-&nbsp;
                {moment(user.created_at).fromNow(false)}
              </p>
            </div>
          </div>
        </div>
        <div className='stats-cell'>
          <div className='count-sec'>
            <div className='counts'>
              <div className='cells'>
                <div className='column-grid'>
                  <div className='head fc-black-700'>
                    {user.answers_count}
                  </div>
                  <div className='foot fc-black-500'>answers</div>
                </div>
              </div>
              <div className='cells'>
                <div className='column-grid'>
                  <div className='head fc-black-700'>
                    {user.posts_count}
                  </div>
                  <div className='foot fc-black-500'>questions</div>
                </div>
              </div>
              <div className='cells'>
                <div className='column-grid'>
                  <div className='head fc-black-700'>
                    {user.comments_count}
                  </div>
                  <div className='foot fc-black-500'>comments</div>
                </div>
              </div>
              <div className='cells'>
                <div className='column-grid'>
                  <div className='head fc-black-700'>
                    {user.tags_count}
                  </div>
                  <div className='foot fc-black-500'>tags</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default UserSection;