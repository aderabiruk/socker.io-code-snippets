import React, { FC } from 'react';

import { User } from '../../redux/Auth/Auth.type';
import UserCard from '../UserCard/UserCard.component';

import './UserBody.style.css';

type UserHeader = {
    users: User[];    
}

const UserHeader: FC<UserHeader> = ({ users }) => {
    return (
        <div className="user-list-container">
            <ul className="user-items">
                {
                    users && users.length > 0 ? (
                        users.map((user: User) => (
                            <UserCard key={user._id} username={user.username} is_online={user.is_online} last_online={user.last_online}/>
                        ))
                    ) : (
                        <div>No Users</div>
                    )
                }
            </ul>
        </div>
    )
};

export default UserHeader;
