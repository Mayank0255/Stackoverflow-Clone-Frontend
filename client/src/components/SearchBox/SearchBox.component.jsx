import React, {Fragment} from 'react';
import {ReactComponent as Search} from "../../assets/Search.svg";

const SearchBox = ({placeholder, handleChange, pt, px}) => {
    return <Fragment>
        <form id="search"
              className={`grid--cell fl-grow1 searchbar ${pt} ${px} js-searchbar`} autoComplete="off">
            <div className="ps-relative search-frame">
                <input
                    className="s-input s-input__search h100 search-box"
                    autoComplete="off"
                    type="text"
                    maxLength="35"
                    placeholder={placeholder}
                    onChange= {handleChange}
                />
                <Search/>
            </div>
        </form>
    </Fragment>
}

export default SearchBox;