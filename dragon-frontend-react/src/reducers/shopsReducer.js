import {
    GET_SHOP_LIST_REQUESTED, GET_SHOP_LIST_SUCCESS, GET_SHOP_LIST_FAILURE,
    GET_SHOP_REQUESTED, GET_SHOP_SUCCESS, GET_SHOP_FAILURE,
    CREATE_SHOP_REQUESTED, CREATE_SHOP_SUCCESS, CREATE_SHOP_FAILURE,
    EDIT_SHOP_REQUESTED, EDIT_SHOP_SUCCESS, EDIT_SHOP_FAILURE,
    ACTIVATE_SHOP_SUCCESS, DEACTIVATE_SHOP_SUCCESS
} from '../actions';

const shopsReducer = (
    state = {
        list: { isFetching: false, data: [], error: false },
        shop: { isFetching: false, data: null, error: false },
        create: { isFetching: false, success: false, error: false },
        edit: { isFetching: false, success: false, error: false },
    }, action) => {
    switch (action.type) {
        case GET_SHOP_LIST_REQUESTED:
            return { ...state, list: { isFetching: true, data: [], error: false } }
        case GET_SHOP_LIST_SUCCESS:
            return { ...state, list: { isFetching: false, data: action.shops, error: false } }
        case GET_SHOP_LIST_FAILURE:
            return { ...state, list: { isFetching: false, data: [], error: true } }
        
        case GET_SHOP_REQUESTED:
            return { ...state, shop: { isFetching: true, data: null, error: false } }
        case GET_SHOP_SUCCESS:
            return { ...state, shop: { isFetching: false, data: action.shop, error: false } }
        case GET_SHOP_FAILURE:
            return { ...state, shop: { isFetching: false, data: null, error: true } }
        
        case CREATE_SHOP_REQUESTED:
            return { ...state, create: { isFetching: true, success: false, error: false } }
        case CREATE_SHOP_SUCCESS:
            return { ...state, create: { isFetching: false, success: true, error: false } }
        case CREATE_SHOP_FAILURE:
            return { ...state, create: { isFetching: false, success: false, error: true } }

        case EDIT_SHOP_REQUESTED:
            return { ...state, edit: { isFetching: true, success: false, error: false } }
        case EDIT_SHOP_SUCCESS:
            return { ...state, edit: { isFetching: false, success: true, error: false }, shop: { ...state.shop, data: action.shop } }
        case EDIT_SHOP_FAILURE:
            return { ...state, edit: { isFetching: false, success: false, error: true } }
        
        case ACTIVATE_SHOP_SUCCESS:
            return { ...state, shop: { ...state.shop, data: { ...state.shop.data, isActive: true } } }

        case DEACTIVATE_SHOP_SUCCESS:
            return { ...state, shop: { ...state.shop, data: { ...state.shop.data, isActive: false } } }
        default:
            return state
    }
}

export default shopsReducer;