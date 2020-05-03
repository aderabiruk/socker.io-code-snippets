import React, { FC } from 'react';
import pluralize from 'pluralize';

import './MessagesHeader.style.css';

type MessagesHeaderType = {
    name: string;
    numberOfMembers: number;
}

const MessagesHeader: FC<MessagesHeaderType> = ({ name, numberOfMembers }) => {
    return (
        <div className="messages-header">
            <div className="messages-header-info">
                <div className="messages-header-name">{ name }</div>
                <div className="messages-header-amount">{ numberOfMembers } { pluralize("Member", numberOfMembers) }</div>
            </div>
        </div>
    )
};

export default MessagesHeader;
