export type JoinChannelPayloadType = {
    email: string;
    username: string;
    channel: string;
};

export type SendMessagePayloadType = {
    from: string;
    channel: string;
    message: string;
}

export type ErrorType = {
    timestamp: string,
    errors: any
};