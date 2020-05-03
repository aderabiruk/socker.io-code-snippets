import _ from 'lodash';

import { MessageActionTypes, MessageStateTypes } from './Message.type';

const INITIAL_STATE: MessageStateTypes = {
    messages: []
};

const MessageReducer = (state: MessageStateTypes = INITIAL_STATE, action: any): MessageStateTypes => {
    switch (action.type) {
        case MessageActionTypes.ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload
                ]
            }
        case MessageActionTypes.POPULATE_MESSAGE:
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
};

export default MessageReducer;