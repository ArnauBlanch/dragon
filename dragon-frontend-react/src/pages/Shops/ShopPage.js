import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Layout } from 'antd';
import Media from 'react-media';
import { getShop } from '../../actions';

class ShopPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(getShop(this.props.match.params.shopId))
    }

    render() {
        const { id, isFetching, data, error } = this.props;
        return (
            <React.Fragment>
                <div style={{ width: '100%', background: '#fff' }}>
                    <Media query="(min-width: 1200px)">
                        { matches => 
                            <PageHeader
                            title={'Botiga'}
                                subTitle={data ? data.name : ''}
                                breadcrumb={{  }}
                                style={{ maxWidth: 1200, margin: 'auto' }} />
                        }
                    </Media>
                </div>
                <Layout.Content style={{ margin: '24px auto 24px auto', background: '#fff', padding: 24, maxWidth: '1200px' }}>
                    {/*<Media query="(min-width: 800px)">
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
                    </Media>*/}
                </Layout.Content>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => state.shops.shop;

export default connect(mapStateToProps)(ShopPage)