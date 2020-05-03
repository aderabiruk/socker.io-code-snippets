import _ from 'lodash';

import { AuthStateTypes, AuthActionTypes } from './Auth.type';
import { getUser, setUser } from './Auth.util';

const INITIAL_STATE: AuthStateTypes = {
    user: getUser()
};

const AuthReducer = (state: AuthStateTypes = INITIAL_STATE, action: any): AuthStateTypes => {
    switch (action.type) {
        case AuthActionTypes.JOIN_CHANNEL:
            // setUser(action.payload);
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
};

export default AuthReducer;