import React, {Fragment} from "react";

const BaseButton = ({
    text,
    selected,
    onClick
}) => {
    return <Fragment>
        <button
            className={`s-btn s-btn__filled ${selected === text ? 'is-selected' : ''}`}
            style={{margin: '0'}}
            onClick={onClick}
        >
            {text}
        </button>
    </Fragment>
}

export default BaseButton;