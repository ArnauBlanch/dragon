import { SHOPS_LIST_REQUESTED, SHOPS_LIST_RECEIVED, SHOPS_LIST_ERROR } from '../actions/shopActions';

const shopsReducer = (
    state = {
        list: {
            isFetching: false,
            data: [],
            error: false
        }
    }, action) => {
    switch (action.type) {
        case SHOPS_LIST_REQUESTED:
            return { ...state, list: { ...state.list, isFetching: true, data: [], error: false } }
        case SHOPS_LIST_RECEIVED:
            return { ...state, list: { ...state.list, isFetching: false, data: action.shops, error: false } }
        case SHOPS_LIST_ERROR:
            return { ...state, list: { ...state.list, isFetching: false, data: [], error: true } }
        default:
            return state
    }
}

export default shopsReducer;