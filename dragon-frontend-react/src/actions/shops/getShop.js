export const GET_SHOP_REQUESTED = 'GET_SHOP_REQUESTED';
export const GET_SHOP_SUCCESS = 'GET_SHOP_SUCCESS';
export const GET_SHOP_FAILURE = 'GET_SHOP_FAILURE';

const getShopRequested = id => {
    return { type: GET_SHOP_REQUESTED, id }
}

const getShopSuccess = shop => {
    return { type: GET_SHOP_SUCCESS, shop }
}

const getShopFailure = (err) => {
    console.error(err)
    return { type: GET_SHOP_FAILURE }
}

export const getShop = shopId => {
    return (dispatch, getState) => {
        dispatch(getShopRequested(shopId));
        return fetch(`${process.env.REACT_APP_API_URL}/shops/${shopId}`, {
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(json => dispatch(getShopSuccess(json)))
                        .catch(err => dispatch(getShopFailure(err)))
                } else {
                    dispatch(getShopFailure(response.statusText))
                }
            })
            .catch(err => dispatch(getShopFailure(err)))
    }
}