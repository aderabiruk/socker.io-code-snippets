export type User = {
    _id: string;
    email: string;
    username: string;
    is_online: boolean;
    last_online: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
};

export type AuthStateTypes = {
    user: User | null;
};

export const AuthActionTypes = {
    JOIN_CHANNEL: "JOIN_CHANNEL",
    JOIN_CHANNEL_SUCCESS: "JOIN_CHANNEL_SUCCESS",
    JOIN_CHANNEL_ERROR: "JOIN_CHANNEL_ERROR",
};