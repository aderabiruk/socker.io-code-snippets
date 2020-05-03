import moment from 'moment';
import React, { FC } from 'react';

import './ProfileBody.style.css';

type ProfileBodyProps = {
    email: string;
    username: string;
    is_onine: boolean;
    created_at: string;
}

const ProfileBody: FC<ProfileBodyProps> = ({ username, email, is_onine, created_at }) => {
    return (
        <div className="user-info-body">
            <div className="user-info-body-item user-info-body-item-user">
                <span className="user-info-body-item-avatar user-info-body-item-online">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" width="36" height="36" className="rounded-circle"/>
                </span>
                <span className="user-info-body-item-name">
                    { username }
                </span>
            </div>
            <div className="user-info-body-item">
                <div className="user-info-body-item-name">
                    Username
                </div>
                <div className="user-info-body-item-text">
                    { username }
                </div>
            </div>
            <div className="user-info-body-item">
                <div className="user-info-body-item-name">
                    Email
                </div>
                <div className="user-info-body-item-text">
                    { email }
                </div>
            </div>
            <div className="user-info-body-item">
                <div className="user-info-body-item-name">
                    Joined
                </div>
                <div className="user-info-body-item-text">
                    { moment(created_at).format("dddd, MMMM Do YYYY") }
                </div>
            </div>
        </div>
    )
};

export default ProfileBody;
