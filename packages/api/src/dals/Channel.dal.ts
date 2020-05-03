import moment from 'moment';

import { User } from "../models/User.model";
import Channel, { Channel as IChannel } from "../models/Channel.model";

class ChannelDAL {

    /**
     * Create Channel
     * 
     * @param {string}  name
     * @param {User}    users
     */
    static create(name: string, users: User[]): Promise<any> {
        return new Promise((resolve, reject) => {
            let channel = new Channel();
            channel.name = name;
            channel.users = users;
            channel.save((error, savedChannel) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(savedChannel);
                }
            });
        });
    }

    /**
     * Find Many Channels
     * 
     * @param {any} query Query Object
     */
    static findMany(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            Channel.find({...query, deleted_at: null}).populate("users").exec((error, channels) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(channels);
                }
            });
        });
    }

    /**
     * Find a Channel
     * 
     * @param {any} query Query Object
     */
    static findOne(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            Channel.findOne({...query, deleted_at: null}).populate("users").exec((error, channel) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(channel);
                }
            });
        });
    }

    /**
     * Update a Channel
     * 
     * @param {Channel} channel  
     * @param {any}     payload
     */
    static update(channel: IChannel, payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            channel.name = payload && payload.name ? payload.name : channel.name;
            channel.users = payload && payload.users ? payload.users : channel.users;
            
            channel.updated_at = moment().toDate();
            channel.save((error, updatedUser) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(updatedUser);
                }
            });
        });
    }
}

export default ChannelDAL;