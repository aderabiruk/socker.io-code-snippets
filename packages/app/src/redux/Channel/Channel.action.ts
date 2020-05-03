import { ChannelActionTypes, Channel } from "./Channel.type";

/**
 * Store Channe
 * 
 * @param {Channel} payload
 */
export const store = (payload: Channel) => ({
    type: ChannelActionTypes.STORE_CHANNEL,
    payload: payload
});