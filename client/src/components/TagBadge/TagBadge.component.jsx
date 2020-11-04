import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const TagBadge = ({ tag_name, size, display }) => {
    return <Fragment>
        <div className='tags-badge' style={{display: display}}>
            <Link className={`${size}`} to={`/tags/${tag_name}`}>
                {tag_name}
            </Link>
        </div>
    </Fragment>
}

export default TagBadge;