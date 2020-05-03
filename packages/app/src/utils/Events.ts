export const SocketEvents = {
    DISCONNECT: "disconnect",

    /** Channel Related Events */
    REFRESH_CHANNEL: "refresh_channels",


    /**
     * Message Related Events
     */
    MESSAGE_SENT: "message_sent",
    MESSAGE_SENT_ERROR: "message_sent_error",
    RECEIVE_MESSAGE: "receive_message",
    REFRESH_MESSAGE: 'refresh_messages',

    /**
     * User Related Events
     */
    USER_JOIN: "user_join",
    USER_JOINED_ERROR: "user_joined_error",
    USER_JOINED_SUCCESS: "user_joined_success",
};