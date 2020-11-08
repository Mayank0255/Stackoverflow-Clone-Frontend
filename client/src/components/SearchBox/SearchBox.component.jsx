import React, {Fragment} from 'react';
import {ReactComponent as Search} from "../../assets/Search.svg";

const SearchBox = ({placeholder, value, name, handleSubmit, handleChange, pt, px, width}) => {
    return <Fragment>
        <form id="search" onSubmit={handleSubmit}
              className={`grid--cell fl-grow1 searchbar ${pt} ${px} js-searchbar`} autoComplete="off">
            <div className="ps-relative search-frame" style={{width}}>
                <input
                    className="s-input s-input__search h100 search-box"
                    autoComplete="off"
                    type="text"
                    name={name}
                    maxLength="35"
                    placeholder={placeholder}
                    onChange= {handleChange}
                    value={value}
                />
                <Search/>
            </div>
        </form>
    </Fragment>
}

export default SearchBox;