import async from 'async';
import moment from 'moment';
import { Types } from 'mongoose';

import UserDAL from '../dals/User.dal';
import { User } from '../models/User.model';
import { ERROR_MESSAGES } from '../errors/constants';


class UserService {

    /**
     * Create Or Update User If it Exists
     * 
     * @param {string} username 
     * @param {string} email
     * @param {boolean} is_online
     */
    static createOrUpdateUser(username: string, email: string, is_online: boolean) {
        return new Promise(async (resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    UserDAL.findOne(({username: username}))
                        .then((user) => {
                            done(null, user);
                        })
                        .catch((error) => {
                            done(error);
                        });
                },
                (user: User, done: Function) => {
                    if (user) {
                        this.setOnlineStatus(user._id, is_online)
                            .then((user: User) => {
                                resolve(user);
                            })
                            .catch((error) => {
                                done(error);
                            });
                    }
                    else {
                        UserDAL.create(username, email, is_online)
                            .then((user: User) => {
                                resolve(user);
                            })
                            .catch((error: any) => {
                                done(error);
                            });
                    }
                }
            ], (error: any) => {
                if (error) {
                    reject(error);
                }
            });
        });
    }

    /**
     * Set Online Status
     * 
     * @param {Types.ObjectId} id
     * @param {boolean} is_online 
     */
    static setOnlineStatus(id: Types.ObjectId, is_online: boolean) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    UserDAL.findOne({_id: id})
                        .then((user: User) => {
                            if (user) {
                                done(null, user);
                            }
                            else {
                                done(ERROR_MESSAGES.USER_NOT_FOUND);
                            }
                        })
                        .catch((error) => {
                            done(error);
                        });
                },
                (user: User, done: Function) => {
                    let payload: any = { is_online: is_online };
                    if (!is_online) {
                        payload.last_online = moment().toDate();
                    }
                    UserDAL.update(user, payload)
                        .then((user: User) => {
                            resolve(user);
                        })
                        .catch((error) => {
                            done(error); 
                        });
                }
            ], (error) => {
                if (error) {
                    reject(error);
                }
            });
        });
    }

}

export default UserService;