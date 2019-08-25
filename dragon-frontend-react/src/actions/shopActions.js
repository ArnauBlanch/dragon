export const SHOPS_LIST_REQUESTED = 'SHOPS_LIST_REQUESTED';
export const SHOPS_LIST_RECEIVED = 'SHOPS_LIST_RECEIVED';
export const SHOPS_LIST_ERROR = 'SHOPS_LIST_ERROR';

const shopsListRequested = () => {
    return { type: SHOPS_LIST_REQUESTED }
}

const shopsListReceived = shops => {
    return { type: SHOPS_LIST_RECEIVED, shops }
}

const shopsListError = err => {
    console.error(err)
    return { type: SHOPS_LIST_ERROR }
}

export const fetchShops = () => {
    return (dispatch, getState) => {
        dispatch(shopsListRequested());
        return fetch(`${process.env.REACT_APP_API_URL}/shops`, {
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(json => dispatch(shopsListReceived(json)))
                        .catch(err => dispatch(shopsListError(err)))
                } else {
                    dispatch(shopsListError(response.statusText))
                }
            })
            .catch(err => dispatch(shopsListError(err)))
    }
}