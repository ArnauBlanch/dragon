import { message } from 'antd';
import i18n from '../../i18n';

export const ACTIVATE_SHOP_REQUESTED = 'ACTIVATE_SHOP_REQUESTED';
export const ACTIVATE_SHOP_SUCCESS = 'ACTIVATE_SHOP_SUCCESS';
export const ACTIVATE_SHOP_FAILURE = 'ACTIVATE_SHOP_FAILURE';

const activateShopRequested = (id) => {
    message.loading(i18n.t('shops.activate-loading'), 2.5)
    return { type: ACTIVATE_SHOP_REQUESTED, id }
}

const activateShopSuccess = (id) => {
    message.destroy()
    message.success(i18n.t('shops.activate-success', 2.5))
    return { type: ACTIVATE_SHOP_SUCCESS, id }
}

const activateShopFailure = (id, err) => {
    message.destroy()
    message.error(i18n.t('shops.activate-error', 2.5))
    console.error(err)
    return { type: ACTIVATE_SHOP_FAILURE, id }
}

export const activateShop = (shopId) => {
    return (dispatch, getState) => {
        dispatch(activateShopRequested(shopId));
        return fetch(`${process.env.REACT_APP_API_URL}/shops/${shopId}/activate?force=true`, {
            method: 'POST',
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    dispatch(activateShopSuccess(shopId))
                } else {
                    dispatch(activateShopFailure(shopId, response.statusText))
                }
            })
            .catch(err => dispatch(activateShopFailure(shopId, err)))
    }
}