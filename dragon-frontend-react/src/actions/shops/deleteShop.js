import { message } from 'antd';

export const DELETE_SHOP_REQUESTED = 'DELETE_SHOP_REQUESTED';
export const DELETE_SHOP_SUCCESS = 'DELETE_SHOP_SUCCESS';
export const DELETE_SHOP_FAILURE = 'DELETE_SHOP_FAILURE';

const deleteShopRequested = (id, t) => {
    message.loading(t('shops.delete-loading'), 2.5)
    return { type: DELETE_SHOP_REQUESTED, id }
}

const deleteShopSuccess = (id, t, pushHistory) => {
    message.destroy()
    message.success(t('shops.delete-success', 2.5))
    pushHistory('/shops')
    return { type: DELETE_SHOP_SUCCESS, id }
}

const deleteShopFailure = (id, err, t) => {
    message.destroy()
    message.error(t('shops.delete-error', 2.5))
    console.error(err)
    return { type: DELETE_SHOP_FAILURE, id }
}

export const deleteShop = (shopId, t, pushHistory) => {
    return (dispatch, getState) => {
        dispatch(deleteShopRequested(shopId, t));
        return fetch(`${process.env.REACT_APP_API_URL}/shops/${shopId}`, {
            method: 'DELETE',
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    deleteShopSuccess(shopId, t, pushHistory)
                } else {
                    dispatch(deleteShopFailure(shopId, response.statusText, t))
                }
            })
            .catch(err => dispatch(deleteShopFailure(shopId, err, t)))
    }
}