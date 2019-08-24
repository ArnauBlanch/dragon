import { LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_ERROR } from "../actions/loginActions";

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
        case LOGIN_FAILURE:
            return { ...state, isFetching: false, unauthorized: true }
        case LOGIN_ERROR:
            return { ...state, isFetching: false, error: true }
        default:
            return state
    }
}

export default loginReducer;