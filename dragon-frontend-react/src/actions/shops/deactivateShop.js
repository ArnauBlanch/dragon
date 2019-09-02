import { message } from 'antd';
import i18n from '../../i18n'

export const DEACTIVATE_SHOP_REQUESTED = 'DEACTIVATE_SHOP_REQUESTED';
export const DEACTIVATE_SHOP_SUCCESS = 'DEACTIVATE_SHOP_SUCCESS';
export const DEACTIVATE_SHOP_FAILURE = 'DEACTIVATE_SHOP_FAILURE';

const deactivateShopRequested = (id) => {
    message.loading(i18n.t('shops.deactivate-loading'), 2.5)
    return { type: DEACTIVATE_SHOP_REQUESTED, id }
}

const deactivateShopSuccess = (id) => {
    message.destroy()
    message.success(i18n.t('shops.deactivate-success', 2.5))
    return { type: DEACTIVATE_SHOP_SUCCESS, id }
}

const deactivateShopFailure = (id, err) => {
    message.destroy()
    message.error(i18n.t('shops.deactivate-error', 2.5))
    console.error(err)
    return { type: DEACTIVATE_SHOP_FAILURE, id }
}

export const deactivateShop = (shopId) => {
    return (dispatch, getState) => {
        dispatch(deactivateShopRequested(shopId));
        return fetch(`${process.env.REACT_APP_API_URL}/shops/${shopId}/deactivate`, {
            method: 'POST',
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    dispatch(deactivateShopSuccess(shopId))
                } else {
                    dispatch(deactivateShopFailure(shopId, response.statusText))
                }
            })
            .catch(err => dispatch(deactivateShopFailure(shopId, err)))
    }
}