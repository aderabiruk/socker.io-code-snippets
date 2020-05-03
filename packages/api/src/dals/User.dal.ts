import moment from "moment";

import User, { User as IUser } from "../models/User.model";

class UserDAL {

    /**
     * Create User
     * 
     * @param {string}  username
     * @param {string}  email
     * @param {boolean} is_online
     */
    static create(username: string, email: string, is_online: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            let user = new User();
            user.username = username;
            user.email = email;
            user.is_online = is_online;
            user.save((error, savedUser) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(savedUser);
                }
            });
        });
    }

    /**
     * Find Many Users
     * 
     * @param {any} query Query Object
     */
    static findMany(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            User.find({...query, deleted_at: null}, (error, users) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(users);
                }
            });
        });
    }

    /**
     * Find a User
     * 
     * @param {any} query Query Object
     */
    static findOne(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOne({...query, deleted_at: null}, (error, users) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(users);
                }
            });
        });
    }

    /**
     * Update a User
     * 
     * @param {User} user  
     * @param {any}  payload
     */
    static update(user: IUser, payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            user.email = payload && payload.email ? payload.email : user.email;
            user.username = payload && payload.username ? payload.username : user.username;
            user.is_online = payload && payload.is_online != null ? payload.is_online : user.is_online;
            user.last_online = payload && payload.last_online ? payload.last_online : user.last_online;

            user.updated_at = moment().toDate();
            user.save((error, updatedUser) => {
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

export default UserDAL;