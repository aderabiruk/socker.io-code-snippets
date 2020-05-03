import async from 'async';
import evalidate from 'evalidate';
import { Socket, Server } from 'socket.io';

import logger from '../utils/Logger';
import UserService from './User.service';
import { User } from '../models/User.model';
import ChannelService from './Channel.service';
import { SocketEvents } from '../utils/Events';
import MessageService from './Message.service';
import { Channel } from '../models/Channel.model';
import { Message } from '../models/Message.model';
import { GenerateErrorMessage } from '../utils/Generator';

class ClientService {
    private user: User;
    private channel : Channel;

    private server: Server;
    private socket: Socket;

    constructor(server: Server, socket: Socket) {
        this.socket = socket;
        this.server = server;
    }

    start() {
        this.socket.on(SocketEvents.USER_JOIN, (payload: any, callback: Function) => {
            this.join(JSON.parse(payload))
                .then((result: any) => {
                    this.user = result.user;
                    this.channel = result.channel;

                    this.socket.join(result.channel.name, () => {                
                        this.socket.emit(SocketEvents.USER_JOINED_SUCCESS, result.user);
                        this.socket.emit(SocketEvents.REFRESH_MESSAGE, result.messages);

                        this.broadcast_to_all_clients(this.channel.name, SocketEvents.REFRESH_CHANNEL, result.channel);
                    });
                })
                .catch((error: any) => {
                    this.broadcast_to_all_clients(this.channel.name, SocketEvents.USER_JOINED_ERROR, GenerateErrorMessage(error));
                });
        });

        this.socket.on(SocketEvents.MESSAGE_SENT, (payload: any, callback: Function) => {
            this.message_received(JSON.parse(payload))
                .then((message) => {
                    this.broadcast_to_all_clients(this.channel.name, SocketEvents.RECEIVE_MESSAGE, message);
                })
                .catch((error: any) => {
                    this.broadcast_to_all_clients(this.channel.name, SocketEvents.RECEIVE_MESSAGE_ERROR, GenerateErrorMessage(error));
                });
        });

        this.socket.on(SocketEvents.DISCONNECT, () => {
            this.disconnect()
                .then(() => {
                    if (this.user) {
                        logger.info(`User ${this.user.username} is Offline`);
                    }
                    if (this.channel) {
                        this.broadcast_to_all_clients(this.channel.name, SocketEvents.REFRESH_CHANNEL, this.channel);
                    }
                })
                .catch((error: any) => {
                    logger.info(error);
                });
        });
    }

    /**
     * User Disconnected
     * 
     */
    disconnect() {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    if (this.user) {
                        UserService.setOnlineStatus(this.user._id, false)
                            .then((user: User) => {
                                this.user = user;
                                done(null);
                            })
                            .catch((error: any) => {
                                done(error);
                            });
                    }
                    else {
                        done(null);
                    }
                },
                (done: Function) => {
                    if (this.channel) {
                        ChannelService.findChannelById(this.channel._id)
                            .then((channel: Channel) => {
                                this.channel = channel;
                                resolve(true);
                            })
                            .catch((error: any) => {
                                done(error);
                            });
                    }
                    else {
                        resolve(true);
                    }
                },
            ], (error: any) => {
                if (error) {
                    reject(error);
                }
            });
        });
    }

    /**
     * User Joined
     * 
     * @param {object} payload 
     */
    join(payload: any) {       
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    let JoinUserSchema = new evalidate.schema({
                        email: evalidate.string().required("Email is required!"),
                        username: evalidate.string().required("Username is required!"),
                        channel: evalidate.string().required("Channel name is required!")
                    });
                    
                    const result = JoinUserSchema.validate(payload);
                    if (result.isValid) {
                        done(null);
                    }
                    else {
                        done(result.errors);
                    }
                },
                (done: Function) => {
                    UserService.createOrUpdateUser(payload.username, payload.email, true)
                        .then((user: User) => {
                            done(null, user);
                        })
                        .catch((error: any) => {
                            done(error);
                        });
                },
                (user: User, done: Function) => {
                    ChannelService.createOrJoinChannel(payload.channel, user)
                        .then((channel: Channel) => {
                            done(null, user, channel);
                        })
                        .catch((error: any) => {
                            done(error);
                        });
                },
                (user: User, channel: Channel, done: Function) => {
                    MessageService.findMessagesOfChannel(channel._id)
                        .then((messages: Message[]) => {
                            resolve({
                                user: user,
                                channel: channel,
                                messages: messages
                            });
                        })
                        .catch((error: any) => {
                            done(error);
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
     * Store Message
     * 
     * @param {Object} payload 
     */
    message_received(payload: any) {
        return new Promise((resolve, reject) => {
            MessageService.store(payload.from ,payload.channel, payload.message)
                .then((message: Message) => {
                    resolve(message);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Broadcast to All Clients
     * 
     * @param {string} channel
     * @param {string} event
     * @param {object} any
     */
    broadcast_to_all_clients(channel: string, event: string, payload: any) {
        if (channel) {
            this.server.to(channel).emit(event, payload);
        }
        else {
            this.server.emit(event, payload);
        }
    }

}

export default ClientService;