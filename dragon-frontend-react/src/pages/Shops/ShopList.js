import React from 'react';
import { Layout, PageHeader, Table, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Media from 'react-media';
import { withTranslation } from 'react-i18next';
import { getShopList, createShop } from '../../actions';
import ShopFormModal from '../../components/ShopFormModal';

const columns = t => [
    { title: t('shops.id'), dataIndex: 'id', key: 'id', render: id => <Link to={`/shops/${id}`}>{id}</Link> },
    { title: t('shops.name'), dataIndex: 'name', key: 'name', width: 300,
        render: (name, shop) => <span>{name} &nbsp; {shop.isActive && <Tag color="green">{t('shops.active')}</Tag>}</span> },
]

class ShopListPage extends React.Component {
    state = { showCreateModal: false }
    componentDidMount() {
        this.props.dispatch(getShopList());
    }

    render() {
        const { t, create, isFetching, data, dispatch } = this.props;
        return (
            <React.Fragment>
                <div style={{ width: '100%', background: '#fff' }}>
                    <PageHeader
                        title={t('shops.shops')}
                        style={{ maxWidth: 1200, margin: 'auto' }} />
                </div>
                <Layout.Content style={{ margin: '24px auto 24px auto', background: '#fff', padding: 24, maxWidth: '1200px' }}>
                    <Button
                        type="primary"
                        icon="plus"
                        onClick={() => this.setState({ showCreateModal: true })}
                        style={{ marginBottom: 16 }}>{t('shops.create-shop')}</Button>
                    <Media query="(min-width: 800px)">
                    { matches => {
                        let columnsToRender = [...columns(t)]
                        if (matches)
                            columnsToRender.push({ title: t('shops.description'), dataIndex: 'description', key: 'description' })

                        return (<Table
                            columns={columnsToRender}
                            style={{ height: '100%' }}
                            loading={isFetching}
                            dataSource={data.map(x => ({ ...x, key: x.id }))} />)
                    }}
                    </Media>
                    <ShopFormModal
                        formState={create}
                        visible={this.state.showCreateModal}
                        handleSubmit={shop => dispatch(createShop(shop))}
                        handleClose={() => this.setState({ showCreateModal: false })} />
                </Layout.Content>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ ...state.shops.list, create: state.shops.create });

export default connect(mapStateToProps)(withTranslation()(ShopListPage));