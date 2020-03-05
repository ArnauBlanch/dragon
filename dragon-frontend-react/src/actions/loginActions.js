import { setUser } from './userActions';
import { saveAuthentication } from '../helpers/localStorage';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_UNAUTHORIZED = 'LOGIN_UNAUTHORIZED';

const loginRequested = () => {
    return { type: LOGIN_REQUESTED }
}

const loginSuccess = (username, apiKey) => {
    saveAuthentication(username, apiKey);

    return { type: LOGIN_SUCCESS }
}

const loginFailure = err => {
    console.error(err)
    return { type: LOGIN_FAILURE }
}

const loginUnauthorized = () => {
    return { type: LOGIN_UNAUTHORIZED }
}

export const login = (username, apiKey, redirectToReferer) => {
    return dispatch => {
        dispatch(loginRequested());
        return fetch(`${process.env.REACT_APP_API_URL}/checkApiKey`, {
            headers: { 'X-Functions-Key': apiKey }
        })
            .then(response => {
                if (response.ok) {
                    dispatch(loginSuccess(username, apiKey));
                    dispatch(setUser(username, apiKey));
                    redirectToReferer();
                    window.scrollY(0);
                } else if (response.status === 401) {
                    dispatch(loginUnauthorized());
                } else {
                    dispatch(loginFailure(response.statusText));
                }
            })
            .catch(err => dispatch(loginFailure(err)))
    }
}