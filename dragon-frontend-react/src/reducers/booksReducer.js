import {
    GET_BOOK_LIST_REQUESTED, GET_BOOK_LIST_SUCCESS, GET_BOOK_LIST_FAILURE,
    GET_BOOK_REQUESTED, GET_BOOK_SUCCESS, GET_BOOK_NOT_FOUND, GET_BOOK_FAILURE
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
        
        case GET_BOOK_REQUESTED:
            return { ...state, [action.isbn]: { isFetching: true, data: null, notFound: false, error: false } }
        case GET_BOOK_SUCCESS:
            return { ...state, [action.isbn]: { isFetching: false, data: action.book, notFound: false, error: false } }
        case GET_BOOK_NOT_FOUND:
            return { ...state, [action.isbn]: { isFetching: false, data: null, notFound: true, error: false } }
        case GET_BOOK_FAILURE:
            return { ...state, [action.isbn]: { isFetching: false, data: null, notFound: false, error: true } }

        default:
            return state
    }
}

export default booksReducer;