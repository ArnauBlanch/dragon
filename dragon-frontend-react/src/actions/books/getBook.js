import { message } from 'antd';
import i18n from '../../i18n';

export const GET_BOOK_REQUESTED = 'GET_BOOK_REQUESTED';
export const GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS';
export const GET_BOOK_NOT_FOUND = 'GET_BOOK_NOT_FOUND';
export const GET_BOOK_FAILURE = 'GET_BOOK_FAILURE';

const getBookRequested = isbn => {
    return { type: GET_BOOK_REQUESTED, isbn }
}

const getBookSuccess = (isbn, book) => {
    return { type: GET_BOOK_SUCCESS, isbn, book }
}

const getBookNotFound = isbn => {
    return { type: GET_BOOK_NOT_FOUND, isbn }
}

const getBookFailure = (isbn, err) => {
    message.error(i18n.t('books.get-error'), 5)
    console.error(err)
    return { type: GET_BOOK_FAILURE, isbn }
}

export const getBook = (shopId, isbn) => {
    return (dispatch, getState) => {
        dispatch(getBookRequested(isbn))
        return fetch(`${process.env.REACT_APP_API_URL}/${shopId}/books/${isbn}`, {
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(json => dispatch(getBookSuccess(isbn, json)))
                        .catch(err => dispatch(getBookFailure(isbn, err)))
                } else if (response.status === 404) {
                    dispatch(getBookNotFound(isbn))
                } else {
                    dispatch(getBookFailure(isbn, response.statusText))
                }
            })
            .catch(err => dispatch(getBookFailure(isbn, err)))
    }
}