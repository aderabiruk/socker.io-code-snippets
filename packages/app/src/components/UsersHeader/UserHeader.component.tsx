import React from 'react';

import './UserHeader.style.css';

const UserHeader = () => {
    return (
        <div className="search-container">
            <div className="input-icon icon-right icon icon-lg icon-color-primary">
                <input id="input-group-icon-text" type="text" className="form-control" placeholder="Search"/>
                <span className="icon-addon">
                    <span className="la la-search"></span>
                </span>
            </div>
        </div>
    )
};

export default UserHeader;
