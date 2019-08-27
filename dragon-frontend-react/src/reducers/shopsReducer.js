import {
    GET_SHOP_LIST_REQUESTED, GET_SHOP_LIST_SUCCESS, GET_SHOP_LIST_FAILURE,
    GET_SHOP_REQUESTED, GET_SHOP_SUCCESS, GET_SHOP_FAILURE
} from '../actions/shopActions';

const shopsReducer = (
    state = {
        list: {
            isFetching: false,
            data: [],
            error: false
        },
        shop: {
            id: null,
            isFetching: false,
            data: null,
            error: false
        }
    }, action) => {
    switch (action.type) {
        case GET_SHOP_LIST_REQUESTED:
            return { ...state, list: { isFetching: true, data: [], error: false } }
        case GET_SHOP_LIST_SUCCESS:
            return { ...state, list: { isFetching: false, data: action.shops, error: false } }
        case GET_SHOP_LIST_FAILURE:
            return { ...state, list: { isFetching: false, data: [], error: true } }
        case GET_SHOP_REQUESTED:
            return { ...state, shop: { id: action.id, isFetching: true, data: null, error: false } }
        case GET_SHOP_SUCCESS:
            return { ...state, shop: { ...state.shop, isFetching: false, data: action.shop, error: false } }
        case GET_SHOP_FAILURE:
            return { ...state, shop: { ...state.shop, isFetching: false, data: null, error: true } }
        default:
            return state
    }
}

export default shopsReducer;