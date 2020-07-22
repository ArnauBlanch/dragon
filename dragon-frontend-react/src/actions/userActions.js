import { removeAuthentication } from '../helpers/localStorage';

export const SET_USER = 'SET_USER';
export const LOG_OUT = 'LOG_OUT';

export const setUser = (username, apiKey) => {
    return { type: SET_USER, username, apiKey }
}

export const logOut = () => {
    removeAuthentication();
    
    return { type: LOG_OUT }
}