import { User } from '../Auth/Auth.type';

export type Channel = {
    _id: string;
    name: string;
    users: User[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
};

export type ChannelStateTypes = {
    channel: Channel | null;
};

export const ChannelActionTypes = {
    STORE_CHANNEL: "STORE_CHANNEL",
};