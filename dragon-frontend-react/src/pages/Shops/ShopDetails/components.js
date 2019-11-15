import React from 'react';
import { Button, Popconfirm, Menu, Dropdown, Icon, Modal } from 'antd';
import { deleteShop, activateShop, deactivateShop } from '../../../actions';

const DeleteButton = ({ t, action }) => (
    <Popconfirm
        placement="bottomRight"
        title={t('shops.delete-confirmation')}
        onConfirm={action}>
        <Button type="danger" icon="delete">{t('shops.delete')}</Button>
    </Popconfirm>
)

export const buttons = ({ t, data, dispatch, ...restProps }, handleEdit) => [
    <Button key="3" icon="poweroff" onClick={() => dispatch((data.isActive ? deactivateShop : activateShop)(data.id))}>
        {data.isActive ? t('shops.deactivate') : t('shops.activate')}
    </Button>,
    <Button key="2" type="primary" icon="edit" onClick={handleEdit}>{t('shops.edit')}</Button>,
    <DeleteButton key="1" t={t} action={() => dispatch(deleteShop(data.id, restProps.history.push))} />
]

export const DeleteModal = ({ t, dispatch, data: { id }, handleClose, history }) => <Modal
    onOk={() => {
        dispatch(deleteShop(id, history.push))
        handleClose()
    }}
    onCancel={handleClose}
    closable={false}visible={true}>
    {t('shops.delete-confirmation')}
</Modal>

export const moreDropdown = ({ t, data, dispatch }, handleEdit, confirmDelete) =>
    <Dropdown placement="bottomRight" overlay={
        <Menu>
            <Menu.Item onClick={() => dispatch((data.isActive ? deactivateShop : activateShop)(data.id))}>
                <Icon type="poweroff"/> {data.isActive ? t('shops.deactivate') : t('shops.activate')}
            </Menu.Item>
            <Menu.Item onClick={handleEdit}><Icon type="edit"/>{t('shops.edit')}</Menu.Item>
            <Menu.Item onClick={confirmDelete}><Icon type="delete"/>{t('shops.delete')}</Menu.Item>
        </Menu>
    }>
        <Button><Icon type="ellipsis"/></Button>
    </Dropdown>