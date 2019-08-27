import { LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_UNAUTHORIZED } from "../actions/loginActions";

const loginReducer = (
    state = {
        isFetching: false,
        success: false,
        unauthorized: false,
        error: false
    }, action) => {
    switch (action.type) {
        case LOGIN_REQUESTED:
            return { ...state, isFetching: true, success: false, unauthorized: false, error: false }
        case LOGIN_SUCCESS:
            return { ...state, isFetching: false, success: true }
        case LOGIN_UNAUTHORIZED:
            return { ...state, isFetching: false, unauthorized: true }
        case LOGIN_FAILURE:
            return { ...state, isFetching: false, error: true }
        default:
            return state
    }
}

export default loginReducer;