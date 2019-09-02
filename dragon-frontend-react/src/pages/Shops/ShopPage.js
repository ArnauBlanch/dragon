import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageHeader, Tag, Button, Popconfirm, Menu, Dropdown, Icon, Modal } from 'antd';
import { withTranslation } from 'react-i18next';
import Media from 'react-media';
import ShopFormModal from '../../components/ShopFormModal';
import { getShop, editShop, deleteShop, activateShop, deactivateShop } from '../../actions';

const DeleteButton = ({ t, action }) => (
    <Popconfirm
        placement="bottomRight"
        title={t('shops.delete-confirmation')}
        onConfirm={action}>
        <Button type="danger" icon="delete">{t('shops.delete')}</Button>
    </Popconfirm>
)

const buttons = ({ t, data, dispatch, ...restProps }, handleEdit) => [
    <Button key="3" icon="poweroff" onClick={() => dispatch((data.isActive ? deactivateShop : activateShop)(data.id))}>
        {data.isActive ? t('shops.deactivate') : t('shops.activate')}
    </Button>,
    <Button key="2" type="primary" icon="edit" onClick={handleEdit}>{t('shops.edit')}</Button>,
    <DeleteButton key="1" t={t} action={() => dispatch(deleteShop(data.id, restProps.history.push))} />
]

const DeleteModal = ({ t, dispatch, data: { id }, handleClose, history }) => <Modal
    onOk={() => {
        dispatch(deleteShop(id, history.push))
        handleClose()
    }}
    onCancel={handleClose}
    closable={false}visible={true}>
    {t('shops.delete-confirmation')}
</Modal>

const moreDropdown = ({ t, data, dispatch }, handleEdit, confirmDelete) =>
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

class ShopPage extends React.Component {
    state = { showEditModal: false, showDeleteModal: false }
    componentDidMount() {
        this.props.dispatch(getShop(this.props.match.params.shopId, this.props.history.push))
    }

    render() {
        const { t, data, edit, dispatch } = this.props;
        return (
            <React.Fragment>
                <Media query="(min-width: 800px)">
                { matches =>
                <div style={{ width: '100%', background: '#fff' }}>
                    <PageHeader
                        title={t('shops.shop')}
                        onBack={() => this.props.history.push('/shops')}
                        subTitle={data ? data.name : ''}
                        tags={data && (data.isActive ?
                            <Tag color="green">{t('shops.active')}</Tag> :
                            <Tag>{t('shops.inactive')}</Tag>
                        )}
                        extra={data && (matches ? buttons(this.props, () => this.setState({ showEditModal: true })) :
                            moreDropdown(this.props,
                                () => this.setState({ showEditModal: true }),
                                () => this.setState({ showDeleteModal: true })))}
                        style={{ maxWidth: 1200, margin: 'auto' }}>
                        {data && (data.description || '')}
                    </PageHeader>
                    <ShopFormModal
                        isEdition={true}
                        formState={edit}
                        shop={data}
                        visible={this.state.showEditModal}
                        handleSubmit={shop => dispatch(editShop(shop))}
                        handleClose={() => this.setState({ showEditModal: false })} />
                    { !matches && this.state.showDeleteModal && data && 
                        <DeleteModal {...this.props}
                            handleClose={() => this.setState({ showDeleteModal: false })} /> }
                </div>}
                </Media>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ ...state.shops.shop, edit: state.shops.edit });

export default withRouter(connect(mapStateToProps)(withTranslation()(ShopPage)))