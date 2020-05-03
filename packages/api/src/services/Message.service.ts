import async from 'async';

import UserDAL from '../dals/User.dal';
import { User } from '../models/User.model';
import ChannelDAL from '../dals/Channel.dal';
import MessageDAL from '../dals/Message.dal';
import { Channel } from '../models/Channel.model';
import { Message } from '../models/Message.model';

class MessageService {

    /**
     * Store Message
     * 
     * @param {string} from 
     * @param {string} channel
     * @param {string} message
     */
    static store(from: string, channel: string, message: string) {
        return new Promise(async (resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    UserDAL.findOne({ _id: from })
                        .then((user: User) => {
                            done(null, user);
                        })
                        .catch((error: any) => {
                            done(error);
                        });
                },
                (user: User, done: Function) => {
                    ChannelDAL.findOne({ _id: channel })
                        .then((channel: Channel) => {
                            done(null, user, channel);
                        })
                        .catch((error: any) => {
                            done(error);
                        });
                },
                (user: User, channel: Channel, done: Function) => {
                    MessageDAL.create(user._id, channel._id, message)
                        .then((message: Message) => {
                            done(null, message);
                        })
                        .catch((error) => {
                            done(error);
                        });
                },
                (message: Message, done: Function) => {
                    message.populate("from").populate("channel", (error: any, result: Message) => {
                        if (error) {
                            done(error);
                        }
                        else {
                            resolve(result);
                        }
                    })
                }
            ], (error: any) => {
                if (error) {
                    reject(error);
                }
            });
        });
    }

    /**
     * Find Message of A Channel
     * 
     * @param {string} channel_id
     */
    static findMessagesOfChannel(channel_id: string) {
        return new Promise((resolve, reject) => {
            MessageDAL.findMany({channel: channel_id})
                .then((messages: Message[]) => {
                    resolve(messages);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
}

export default MessageService;