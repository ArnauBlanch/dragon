import { message } from "antd";
import i18n from '../../i18n';

export const EDIT_SHOP_REQUESTED = 'EDIT_SHOP_REQUESTED';
export const EDIT_SHOP_SUCCESS = 'EDIT_SHOP_SUCCESS';
export const EDIT_SHOP_FAILURE = 'EDIT_SHOP_FAILURE';

const editShopRequested = id => {
    return { type: EDIT_SHOP_REQUESTED, id }
}

const editShopSuccess = (shop) => {
    message.success(i18n.t('shops.edit-success'), 2.5)
    return { type: EDIT_SHOP_SUCCESS, id: shop.id, shop }
}

const editShopFailure = (id, err) => {
    message.error(i18n.t('shops.edit-error'), 2.5)
    console.error(err)
    return { type: EDIT_SHOP_FAILURE, id }
}

export const editShop = (shop) => {
    return (dispatch, getState) => {
        dispatch(editShopRequested(shop.id));
        return fetch(`${process.env.REACT_APP_API_URL}/shops/${shop.id}`, {
            method: 'PUT',
            body: JSON.stringify(shop),
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(json => dispatch(editShopSuccess(json)))
                        .catch(err => dispatch(editShopFailure(shop.id, err)))
                } else {
                    dispatch(editShopFailure(shop.id, response.statusText))
                }
            })
            .catch(err => dispatch(editShopFailure(shop.id, err)))
    }
}