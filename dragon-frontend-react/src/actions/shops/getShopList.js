import { message } from 'antd';
import i18n from 'i18next';

export const GET_SHOP_LIST_REQUESTED = 'GET_SHOP_LIST_REQUESTED';
export const GET_SHOP_LIST_SUCCESS = 'GET_SHOP_LIST_SUCCESS';
export const GET_SHOP_LIST_FAILURE = 'GET_SHOP_LIST_FAILURE';

const getShopListRequested = () => {
    return { type: GET_SHOP_LIST_REQUESTED }
}

const getShopListSuccess = shops => {
    return { type: GET_SHOP_LIST_SUCCESS, shops }
}

const getShopListFailure = err => {
    message.error(i18n.t('shops.get-list-error'))
    console.error(err)
    return { type: GET_SHOP_LIST_FAILURE }
}

export const getShopList = () => {
    return (dispatch, getState) => {
        dispatch(getShopListRequested());
        return fetch(`${process.env.REACT_APP_API_URL}/shops`, {
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(json => dispatch(getShopListSuccess(json)))
                        .catch(err => dispatch(getShopListFailure(err)))
                } else {
                    dispatch(getShopListFailure(response.statusText))
                }
            })
            .catch(err => dispatch(getShopListFailure(err)))
    }
}