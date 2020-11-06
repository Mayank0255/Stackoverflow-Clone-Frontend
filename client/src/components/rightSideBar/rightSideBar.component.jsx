import React, {Fragment} from 'react';

import SideBarWidget from './SideBarWidget.component';
import TagsWidget from './TagsWidget.component';

import './rightSideBar.styles.scss';

const RightSideBar = () => {
    return <Fragment>
        <div
            id='sidebar'
            className='side-bar'
        >
            <SideBarWidget/>
            <TagsWidget/>
        </div>
    </Fragment>
};

export default RightSideBar;