import { message } from "antd";
import i18n from 'i18next';

export const GET_SHOP_REQUESTED = 'GET_SHOP_REQUESTED';
export const GET_SHOP_SUCCESS = 'GET_SHOP_SUCCESS';
export const GET_SHOP_FAILURE = 'GET_SHOP_FAILURE';

const getShopRequested = id => {
    return { type: GET_SHOP_REQUESTED, id }
}

const getShopSuccess = shop => {
    return { type: GET_SHOP_SUCCESS, shop }
}

const getShopFailure = (err, pushHistory, notFound = false) => {
    console.error(err)
    message.error(i18n.t(notFound ? 'shops.shop-not-found' : 'shops.get-error'))
    pushHistory('/shops')
    return { type: GET_SHOP_FAILURE }
}

export const getShop =(shopId, pushHistory) => {
    return (dispatch, getState) => {
        dispatch(getShopRequested(shopId));
        return fetch(`${process.env.REACT_APP_API_URL}/shops/${shopId}`, {
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(json => dispatch(getShopSuccess(json)))
                        .catch(err => dispatch(getShopFailure(err, pushHistory)))
                } else {
                    dispatch(getShopFailure(response.statusText, pushHistory, response.status === 404))
                }
            })
            .catch(err => dispatch(getShopFailure(err, pushHistory)))
    }
}