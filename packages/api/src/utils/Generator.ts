import moment from 'moment';

import { User } from "../models/User.model";
import { Channel } from '../models/Channel.model';

/**
 * Generate Join Success Message
 * 
 * @param {User} joinedUser 
 * @param {Array} users 
 */
export const GenerateJoinSuccessMessage = (user: User, channel: Channel) => ({
    user: user,
    channel: channel
});

/**
 * Generate Error Message
 * 
 * @param {Object} error 
 */
export const GenerateErrorMessage = (error: any) => ({
    timestamp: moment(),
    error: error
});