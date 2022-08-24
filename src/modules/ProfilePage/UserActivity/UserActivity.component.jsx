import React from "react";

import TagBadge from "../../../components/molecules/TagBadge/TagBadge.component";

import './UserActivity.styles.scss';

const UserActivity = () => (
  <div className='grid-cell2'>
    <div className='top-tags'>
      <h3 className='fw-bold fc-dark bc-black-3'>Top Tags</h3>
      <div className='top-tags-sec'>
        <div className='top-tags-cells'>
          <div className='top-cell'>
            <div className='tag-cell bg-black-025'>
              <TagBadge
                tag_name={'java'}
                size={'s-tag s-tag__lg'}
                float={'left'}
              />
              <div className='score'>
                <div className='score-txt'>
                  <div className='score-tab'>
                    <span className='txt fc-light'>Posts</span>
                    <span className='number fc-black-800'>2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='top-tags-cells'>
          <div className='top-cell'>
            <div className='tag-cell bg-black-025'>
              <TagBadge
                tag_name={'node.js'}
                size={'s-tag s-tag__md'}
                float={'left'}
              />
              <div className='score'>
                <div className='score-txt'>
                  <div className='score-tab'>
                    <span className='txt fc-light'>Posts</span>
                    <span className='number fc-black-800'>1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='top-tags-cells'>
          <div className='top-cell'>
            <div className='tag-cell bg-black-025'>
              <TagBadge
                tag_name={'react'}
                size={'s-tag s-tag__md'}
                float={'left'}
              />
              <div className='score'>
                <div className='score-txt'>
                  <div className='score-tab'>
                    <span className='txt fc-light'>Posts</span>
                    <span className='number fc-black-800'>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default UserActivity;