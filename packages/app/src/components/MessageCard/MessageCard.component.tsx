import React, { FC } from 'react';

import './MessageCard.style.css';

type MessageCardProps = {
    message: string;
    time: string;
    username: string;
}

export const SelfMessageCard: FC<MessageCardProps> = ({ message, time, username }) => {
    return (
        <li className="message-item message-self">
            <span className="message-item-avatar message-item-offline">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" width="36" height="36" className="rounded-circle"/>
            </span>
            <div className="message-item-body">
                <div className="message-item-body-header">
                    <span className="message-item-body-name">{ username }</span>
                    <span className="message-item-body-datetime">{ time }</span>
                </div>
                <div className="message-item-body-payload">{ message }</div>
            </div>
        </li>
                
    )
};

export const FromMessageCard: FC<MessageCardProps> = ({ message, time, username }) => {
    return (
        <li className="message-item message-from">
            <span className="message-item-avatar message-item-online">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" width="36" height="36" className="rounded-circle"/>
            </span>
            <div className="message-item-body">
                <div className="message-item-body-header">
                    <span className="message-item-body-name">{ username }</span>
                    <span className="message-item-body-datetime">{ time }</span>
                </div>
                <div className="message-item-body-payload">{ message }</div>
            </div>
        </li>
    )
};
