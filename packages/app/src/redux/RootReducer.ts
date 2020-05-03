import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AuthReducer from './Auth/Auth.reducer';
import ChannelReducer from './Channel/Channel.reducer';
import MessageReducer from './Message/Message.reducer';

const PersistConfig = {
    key: 'root',
    storage,
    whitelist: [
        // "auth",
        // "channel",
        // "message"
    ]
};

const RootReducer = combineReducers({
    auth: AuthReducer,
    channel: ChannelReducer,
    message: MessageReducer
});

export default persistReducer(PersistConfig, RootReducer);