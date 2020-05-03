import React, { FC } from 'react';

import './UserCard.style.css';

type UserCardProps = {
    username: string;
    last_online: Date;
    is_online: boolean;
}

const UserCard: FC<UserCardProps> = ({ username, is_online, last_online }) => {
    return (
        <li className="user-item">
            <a href="#">
                <span className="user-avatar">
                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" width="36" height="36"/>
                </span>
                <div className="user-body">
                    <div className="user-name">
                        { username }
                        { 
                            is_online ? (
                                <span className="user-datetime text-success">Online</span>
                            ) : (
                                <span className="user-datetime text-default">Offile</span>
                            )
                        }
                    </div>
                </div>
            </a>
        </li>
    )
};

export default UserCard;
