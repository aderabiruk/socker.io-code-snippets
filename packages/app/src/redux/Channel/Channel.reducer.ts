import _ from 'lodash';

import { ChannelActionTypes, ChannelStateTypes } from './Channel.type';

const INITIAL_STATE: ChannelStateTypes = {
    channel: null
};

const ChannelReducer = (state: ChannelStateTypes = INITIAL_STATE, action: any): ChannelStateTypes => {
    switch (action.type) {
        case ChannelActionTypes.STORE_CHANNEL:
            return {
                ...state,
                channel: action.payload
            }
        default:
            return state;
    }
};

export default ChannelReducer;