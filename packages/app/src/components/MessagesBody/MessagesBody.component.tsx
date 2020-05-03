import moment from 'moment';
import React, { FC } from 'react';

import './MessagesBody.style.css';

import { User } from '../../redux/Auth/Auth.type';
import { Message } from '../../redux/Message/Message.type';
import { FromMessageCard, SelfMessageCard } from '../MessageCard/MessageCard.component';

type MessageBodyProps = {
    user: User;
    messages: Message[];
}

const MessagesBody: FC<MessageBodyProps> = ({ user, messages }) => {
    return (
        <div className="messages-body">
            <ul className="message-list">
                {
                    messages && messages.length != 0 ? (
                        messages.map((message: Message) => {
                            if (user._id === message.from._id) {
                                return <SelfMessageCard key={message._id} username={message.from.username} time={moment(message.created_at).format("HH:mm A")} message={message.message} />
                            }
                            else {
                                return <FromMessageCard key={message._id} username={message.from.username} time={moment(message.created_at).format("HH:mm A")} message={message.message} />
                            }
                        })
                    ) : (
                        <div className="messages-empty-error">
                            No Messages
                        </div>
                    )
                }
            </ul>
        </div>
    )
};

export default MessagesBody;
