import React, { FC } from 'react';
import { connect } from 'react-redux';

import UsersBody from '../../components/UsersBody/UserBody.component';
import UserHeader from '../../components/UsersHeader/UserHeader.component';
import ProfileBody from '../../components/ProfileBody/ProfileBody.component';
import MessagesBody from '../../components/MessagesBody/MessagesBody.component';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader.component';
import MessagesHeader from '../../components/MessagesHeader/MessagesHeader.component';
import MessagesFooter from '../../components/MessagesFooter/MessagesFooter.component';

import { User } from '../../redux/Auth/Auth.type';
import { Channel } from '../../redux/Channel/Channel.type';

import './Chat.style.css';
import { Message } from '../../redux/Message/Message.type';

type ChatProps = {
    user: User;
    channel: Channel;
    messages: Message[];
}

const Chat: FC<ChatProps> = ({ user, channel, messages }) => {
    let members = channel ? channel.users : [];
    return (
        <div className="container">
            <div className="chat-users-container">
                <UserHeader/>
                <UsersBody users={members}/>
            </div>
            <div className="chat-messages-container">
                <MessagesHeader name={channel ? channel.name : ""} numberOfMembers={channel && channel.users ? channel.users.length : 0}/>
                <MessagesBody messages={messages} user={user}/>
                <MessagesFooter user={user} channel={channel}/>
            </div>
            <div className="chat-user-info-container">
                <ProfileHeader/>
                <ProfileBody username={user.username} email={user.email} is_onine={user.is_online} created_at={ new Date(user.created_at).toLocaleString() }/>
            </div>
        </div>
    )
};

/**
 * Map State to Props
 * 
 * @param state {Object}
 */
const mapStateToProps = (state: any) => ({
    channel: state.channel.channel,
    messages: state.message.messages,
    user: state.auth.user,
});

/**
 * Map Dispatch to Props
 * 
 * @param dispatch 
 */
const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);