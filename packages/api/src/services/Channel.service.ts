import async from 'async';

import { User } from '../models/User.model';
import ChannelDAL from '../dals/Channel.dal';
import { Channel } from '../models/Channel.model';


class ChannelService {

    /**
     * Create Or Join Channel
     * 
     * @param {string} channel_name 
     * @param {User}   user
     */
    static createOrJoinChannel(channel_name: string, user: User): Promise<any> {
        return new Promise(async (resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    ChannelDAL.findOne({name: channel_name})
                        .then((channel: Channel) => {
                            done(null, channel);
                        })
                        .catch((error: any) => {
                            done(error);
                        });
                },
                (channel: Channel, done: Function) => {
                    if (channel) {
                        let users = channel.users;
                        if (users.findIndex((item: User) => user._id.toString() === item._id.toString()) === -1) {
                            users.push(user);
                        }
                        ChannelDAL.update(channel, { users: users })
                            .then((updatedChannel: Channel) => {
                                done(null, updatedChannel);
                            })
                            .catch((error: any) => {
                                done(error);
                            });
                    }
                    else {
                        ChannelDAL.create(channel_name, [ user._id ])
                            .then((savedChannel: Channel) => {
                                done(null, savedChannel);
                            })
                            .catch((error: any) => {
                                done(error);
                            });
                    }
                },
                (channel: Channel, done: Function) => {
                    channel.populate("users", (error: any, response: Channel) => {
                        if (error) {
                            done(error);
                        }
                        else {
                            resolve(channel);
                        }
                    });
                }
            ], (error: any) => {
                if (error) {
                    reject(error);
                }
            });
        });
    }

    /**
     * Find Channel By ID
     * 
     * @param {string} id 
     */
    static findChannelById(id: string) {
        return new Promise((resolve, reject) => {
            ChannelDAL.findOne({_id: id})
                .then((channel: Channel) => {
                    resolve(channel);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    /**
     * Find Channel By Name
     * 
     * @param {string} name 
     */
    static findChanneByName(name: string) {
        return new Promise((resolve, reject) => {
            ChannelDAL.findOne({name: name})
                .then((channel: Channel) => {
                    resolve(channel);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
}

export default ChannelService;