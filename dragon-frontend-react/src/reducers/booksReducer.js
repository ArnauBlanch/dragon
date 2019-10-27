import {
    GET_BOOK_LIST_REQUESTED, GET_BOOK_LIST_SUCCESS, GET_BOOK_LIST_FAILURE,
} from '../actions';

const booksReducer = (
    state = {
        list: { isFetching: false, data: [], error: false },
    }, action) => {
    switch (action.type) {
        case GET_BOOK_LIST_REQUESTED:
            return { ...state, list: { isFetching: true, data: [], error: false } }
        case GET_BOOK_LIST_SUCCESS:
            return { ...state, list: { isFetching: false, data: action.books, error: false } }
        case GET_BOOK_LIST_FAILURE:
            return { ...state, list: { isFetching: false, data: [], error: true } }
        
        default:
            return state
    }
}

export default booksReducer;