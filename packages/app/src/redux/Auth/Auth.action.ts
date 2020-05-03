import { AuthActionTypes, User } from "./Auth.type";

/**
 * Populate Users Action
 * 
 * @param {JoinChannelMessageType} payload
 */
export const join = (payload: User) => ({
    type: AuthActionTypes.JOIN_CHANNEL,
    payload: payload
});