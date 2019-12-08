import { SET_USER, LOG_OUT } from "../actions/userActions";

const userReducer = (
    state = {
        isAuthenticated: window.localStorage.getItem('authenticated') || null,
        username: window.localStorage.getItem('username') || null,
        isAdmin: window.localStorage.getItem('username') ?
            window.localStorage.getItem('username').toLowerCase().includes('admin') : false,
        apiKey: window.localStorage.getItem('apiKey') || null
    }, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, isAuthenticated: true, username: action.username, apiKey: action.apiKey,
                isAdmin: action.username.toLowerCase().includes('admin') }
        case LOG_OUT:
            return { ...state, isAuthenticated: false, username: null, apiKey: null, isAdmin: null }
        default:
            return state
    }
}

export default userReducer;