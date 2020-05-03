import { User } from '../Auth/Auth.type';
import { Channel } from '../Channel/Channel.type';


export type Message = {
    _id: string;
    from: User;
    channel: Channel;
    message: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
};

export type MessageStateTypes = {
    messages: Message[];
};

export const MessageActionTypes = {
    ADD_MESSAGE: "ADD_MESSAGE",
    POPULATE_MESSAGE: "POPULATE_MESSAGE"
};