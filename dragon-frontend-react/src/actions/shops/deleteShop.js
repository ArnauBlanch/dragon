import { message } from 'antd';
import i18n from '../../i18n'

export const DELETE_SHOP_REQUESTED = 'DELETE_SHOP_REQUESTED';
export const DELETE_SHOP_SUCCESS = 'DELETE_SHOP_SUCCESS';
export const DELETE_SHOP_FAILURE = 'DELETE_SHOP_FAILURE';

const deleteShopRequested = (id) => {
    message.loading(i18n.t('shops.delete-loading'), 2.5)
    return { type: DELETE_SHOP_REQUESTED, id }
}

const deleteShopSuccess = (id, pushHistory) => {
    message.destroy()
    message.success(i18n.t('shops.delete-success', 2.5))
    pushHistory('/shops')
    return { type: DELETE_SHOP_SUCCESS, id }
}

const deleteShopFailure = (id, err) => {
    message.destroy()
    message.error(i18n.t('shops.delete-error', 2.5))
    console.error(err)
    return { type: DELETE_SHOP_FAILURE, id }
}

export const deleteShop = (shopId, pushHistory) => {
    return (dispatch, getState) => {
        dispatch(deleteShopRequested(shopId));
        return fetch(`${process.env.REACT_APP_API_URL}/shops/${shopId}`, {
            method: 'DELETE',
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    deleteShopSuccess(shopId, pushHistory)
                } else {
                    dispatch(deleteShopFailure(shopId, response.statusText))
                }
            })
            .catch(err => dispatch(deleteShopFailure(shopId, err)))
    }
}