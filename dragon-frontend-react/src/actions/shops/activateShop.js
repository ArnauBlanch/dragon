import { message } from 'antd';

export const ACTIVATE_SHOP_REQUESTED = 'ACTIVATE_SHOP_REQUESTED';
export const ACTIVATE_SHOP_SUCCESS = 'ACTIVATE_SHOP_SUCCESS';
export const ACTIVATE_SHOP_FAILURE = 'ACTIVATE_SHOP_FAILURE';

const activateShopRequested = (id, t) => {
    message.loading(t('shops.activate-loading'), 2.5)
    return { type: ACTIVATE_SHOP_REQUESTED, id }
}

const activateShopSuccess = (id, t) => {
    message.destroy()
    message.success(t('shops.activate-success', 2.5))
    return { type: ACTIVATE_SHOP_SUCCESS, id }
}

const activateShopFailure = (id, err, t) => {
    message.destroy()
    message.error(t('shops.activate-error', 2.5))
    console.error(err)
    return { type: ACTIVATE_SHOP_FAILURE, id }
}

export const activateShop = (shopId, t) => {
    return (dispatch, getState) => {
        dispatch(activateShopRequested(shopId, t));
        return fetch(`${process.env.REACT_APP_API_URL}/shops/${shopId}/activate?force=true`, {
            method: 'POST',
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    dispatch(activateShopSuccess(shopId, t))
                } else {
                    dispatch(activateShopFailure(shopId, response.statusText, t))
                }
            })
            .catch(err => dispatch(activateShopFailure(shopId, err, t)))
    }
}