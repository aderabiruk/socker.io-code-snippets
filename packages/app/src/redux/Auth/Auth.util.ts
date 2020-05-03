import { User } from './Auth.type';

/**
 * Get User from LocalStorage
 */
export const getUser = () : User => {
    return JSON.parse(localStorage.getItem('user') || "{}");
};

/**
 * Store User in LocalStorage
 * 
 * @param {User} user 
 */
export const setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Remove User from LocalStorage
 */
export const removeUser = () => {
    localStorage.removeItem('user')
};

