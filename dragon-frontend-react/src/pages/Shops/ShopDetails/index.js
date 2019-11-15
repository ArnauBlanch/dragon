import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageHeader, Tag } from 'antd';
import { withTranslation } from 'react-i18next';
import Media from 'react-media';
import ShopFormModal from '../../../components/ShopFormModal';
import { getShop, editShop } from '../../../actions';
import { buttons, DeleteModal, moreDropdown } from './components';


class ShopDetailsPage extends React.Component {
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

export default withRouter(connect(mapStateToProps)(withTranslation()(ShopDetailsPage)))