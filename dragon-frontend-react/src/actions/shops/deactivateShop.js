import { message } from 'antd';

export const DEACTIVATE_SHOP_REQUESTED = 'DEACTIVATE_SHOP_REQUESTED';
export const DEACTIVATE_SHOP_SUCCESS = 'DEACTIVATE_SHOP_SUCCESS';
export const DEACTIVATE_SHOP_FAILURE = 'DEACTIVATE_SHOP_FAILURE';

const deactivateShopRequested = (id, t) => {
    message.loading(t('shops.deactivate-loading'), 2.5)
    return { type: DEACTIVATE_SHOP_REQUESTED, id }
}

const deactivateShopSuccess = (id, t) => {
    message.destroy()
    message.success(t('shops.deactivate-success', 2.5))
    return { type: DEACTIVATE_SHOP_SUCCESS, id }
}

const deactivateShopFailure = (id, err, t) => {
    message.destroy()
    message.error(t('shops.deactivate-error', 2.5))
    console.error(err)
    return { type: DEACTIVATE_SHOP_FAILURE, id }
}

export const deactivateShop = (shopId, t) => {
    return (dispatch, getState) => {
        dispatch(deactivateShopRequested(shopId, t));
        return fetch(`${process.env.REACT_APP_API_URL}/shops/${shopId}/deactivate`, {
            method: 'POST',
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    dispatch(deactivateShopSuccess(shopId, t))
                } else {
                    dispatch(deactivateShopFailure(shopId, response.statusText, t))
                }
            })
            .catch(err => dispatch(deactivateShopFailure(shopId, err, t)))
    }
}