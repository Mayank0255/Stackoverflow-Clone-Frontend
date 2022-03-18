import React from "react";
import moment from "moment";

import './ContentCard.styles.scss';

const ContentCard = ({ username, answers_count, posts_count, comments_count, tags_count, created_at }) => (
  <div className='content-card'>
    <div className='content-grid'>
      <div className='info-cell'>
        <div className='info'>
          <div className='details'>
            <h2>{username}</h2>
          </div>
          <div className='date'>
            <p>
              user created &nbsp;-&nbsp;
              {moment(created_at).fromNow(false)}
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
                  {answers_count}
                </div>
                <div className='foot fc-black-500'>answers</div>
              </div>
            </div>
            <div className='cells'>
              <div className='column-grid'>
                <div className='head fc-black-700'>
                  {posts_count}
                </div>
                <div className='foot fc-black-500'>questions</div>
              </div>
            </div>
            <div className='cells'>
              <div className='column-grid'>
                <div className='head fc-black-700'>
                  {comments_count}
                </div>
                <div className='foot fc-black-500'>comments</div>
              </div>
            </div>
            <div className='cells'>
              <div className='column-grid'>
                <div className='head fc-black-700'>
                  {tags_count}
                </div>
                <div className='foot fc-black-500'>tags</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ContentCard;