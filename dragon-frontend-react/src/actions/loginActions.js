import { setUser } from './userActions';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const loginRequested = () => {
    return { type: LOGIN_REQUESTED }
}

const loginSuccess = (username, apiKey) => {
    window.localStorage.setItem('authenticated', true);
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('apiKey', apiKey);

    return { type: LOGIN_SUCCESS }
}

const loginFailure = () => {
    return { type: LOGIN_FAILURE }
}

const loginError = (err) => {
    console.error(err)
    return { type: LOGIN_ERROR }
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
                } else if (response.status === 401) {
                    dispatch(loginFailure());
                } else {
                    dispatch(loginError());
                }
            })
            .catch(err => dispatch(loginError(err)))
    }
}