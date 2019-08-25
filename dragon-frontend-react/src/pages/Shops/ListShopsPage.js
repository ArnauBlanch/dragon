import React from 'react';
import { Layout, PageHeader, Table } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Media from 'react-media';
import { fetchShops } from '../../actions';

const routes = [
    { path: 'shops', breadcrumbName: 'Botigues' },
    { path: 'list', breadcrumbName: 'Llista de botigues'}
]

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', render: id => <Link to={`/shops/${id}`}>{id}</Link> },
    { title: 'Nom', dataIndex: 'name', key: 'name', width: 300 },
]

class ListShopsPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchShops());
    }

    render() {
        return (
            <React.Fragment>
                <PageHeader title="Llista de botigues" breadcrumb={{ routes }} />
                <Layout.Content style={{ margin: '24px 16px', background: '#fff', padding: 24 }}>
                    <Media query="(min-width: 599px)">
                        { matches => {
                            let columnsToRender = [...columns]
                            if (matches)
                                columnsToRender.push({ title: 'Descripció', dataIndex: 'description', key: 'description' })

                            return (<Table
                                columns={columnsToRender}
                                style={{ height: '100%' }}
                                loading={this.props.isFetching}
                                dataSource={this.props.data.map(x => ({ ...x, key: x.id }))} />)
                        }}
                    </Media>
                </Layout.Content>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => state.shops.list;

export default connect(mapStateToProps)(ListShopsPage);