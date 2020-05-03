import { MessageActionTypes, Message } from "./Message.type";

/**
 * Add Message
 * 
 * @param {Message} payload
 */
export const addMessage = (payload: Message) => ({
    type: MessageActionTypes.ADD_MESSAGE,
    payload: payload
});

/**
 * Populate Messages
 * 
 * @param {Array} payload
 */
export const populateMessages = (payload: Message[]) => ({
    type: MessageActionTypes.POPULATE_MESSAGE,
    payload: payload
});