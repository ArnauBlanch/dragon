import { message } from 'antd';
import i18n from '../../i18n';

export const GET_BOOK_LIST_REQUESTED = 'GET_BOOK_LIST_REQUESTED';
export const GET_BOOK_LIST_SUCCESS = 'GET_BOOK_LIST_SUCCESS';
export const GET_BOOK_LIST_FAILURE = 'GET_BOOK_LIST_FAILURE';

const getBookListRequested = (shopId) => {
    return { type: GET_BOOK_LIST_REQUESTED }
}

const getBookListSuccess = books => {
    return { type: GET_BOOK_LIST_SUCCESS, books }
}

const getBookListFailure = err => {
    message.error(i18n.t('books.get-list-error', 5))
    console.error(err)
    return { type: GET_BOOK_LIST_FAILURE }
}

export const getBookList = shopId => {
    return (dispatch, getState) => {
        dispatch(getBookListRequested());
        return fetch(`${process.env.REACT_APP_API_URL}/${shopId}/books`, {
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(json => dispatch(getBookListSuccess(json)))
                        .catch(err => dispatch(getBookListFailure(err)))
                } else {
                    dispatch(getBookListFailure(response.statusText))
                }
            })
            .catch(err => dispatch(getBookListFailure(err)))
    }
}
