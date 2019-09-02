import { message } from 'antd';
import i18n from '../../i18n';
import { getShopList } from './getShopList';

export const CREATE_SHOP_REQUESTED = 'CREATE_SHOP_REQUESTED';
export const CREATE_SHOP_SUCCESS = 'CREATE_SHOP_SUCCESS';
export const CREATE_SHOP_FAILURE = 'CREATE_SHOP_FAILURE';

const createShopRequested = id => {
    return { type: CREATE_SHOP_REQUESTED, id }
}

const createShopSuccess = (id, t) => {
    message.success(i18n.t('shops.create-success'), 2.5)
    return { type: CREATE_SHOP_SUCCESS, id }
}

const createShopFailure = (id, t, err) => {
    message.error(i18n.t('shops.create-error'), 2.5)
    console.error(err)
    return { type: CREATE_SHOP_FAILURE, id }
}

export const createShop = (shop, t) => {
    return (dispatch, getState) => {
        dispatch(createShopRequested(shop.id));
        return fetch(`${process.env.REACT_APP_API_URL}/shops`, {
            method: 'POST',
            body: JSON.stringify(shop),
            headers: { 'X-Functions-Key': getState().user.apiKey }
        })
            .then(response => {
                if (response.ok) {
                    dispatch(createShopSuccess(shop.id, t))
                    dispatch(getShopList())
                } else {
                    dispatch(createShopFailure(shop.id, t, response.statusText))
                }
            })
            .catch(err => dispatch(createShopFailure(shop.id, t, err)))
    }
}