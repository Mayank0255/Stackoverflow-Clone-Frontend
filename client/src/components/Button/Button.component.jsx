import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Button = (
    {
        text,
        link,
        type,
        handleClick
    }) => {

    return <Fragment>
        <Link
            onClick={handleClick}
            to={link}
        >
            <button className = {`s-btn ${type}`}>
                {text}
            </button>
        </Link>
    </Fragment>
}

export default Button;