import React from 'react';
import { Layout, PageHeader, Button, Tag } from 'antd';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import SearchableTable from '../../components/SearchableTable';
import { getBookList } from '../../actions';

const columns = t => [
    {
        title: t("books.isbn"),
        dataIndex: 'isbn',
        render: id => <Link to={`/books/${id}`}>{id}</Link>,
        defaultSortOrder: 'ascend', sorter: (a, b) => a.isbn - b.isbn,
        align: 'center', width: 200
    },
    {
        title: t('books.title'),
        dataIndex: 'title',
        render: (name, shop) => <span>{name} &nbsp; {shop.isActive && <Tag color="green">{t('shops.active')}</Tag>}</span>,
        searchable: true
    },
]

class BookListPage extends React.Component {
    state = { showCreateModal: false }
    componentDidMount() {
        this.props.dispatch(getBookList('DevOpsTestShop'));
    }    

    render() {
        const { t, isFetching, data } = this.props;
        return (
            <React.Fragment>
                <div style={{ width: '100%', background: '#fff' }}>
                    <PageHeader
                        title={t('books.books')}
                        style={{ maxWidth: 1200, margin: 'auto' }} />
                </div>
                <Layout.Content style={{ margin: '24px auto 24px auto', background: '#fff', padding: 24, maxWidth: '1200px' }}>
                    <Button
                        type="primary"
                        icon="plus"
                        onClick={() => this.setState({ showCreateModal: true })}
                        style={{ marginBottom: 16 }}>{t('books.add-book')}</Button>
                    <Media query="(min-width: 600px)">
                        { matches => {
                            let columnsToRender = [...columns(t)]
                            if (matches)
                                columnsToRender.push({ title: t('books.author'), dataIndex: 'author', searchable: true })

                            return (
                                <SearchableTable
                                    rowKey="isbn"
                                    dataSource={data}
                                    loading={isFetching}
                                    columns={columnsToRender}
                                    getColumnName={x => t(`books.${x}`)} />
                            )
                        }}
                    </Media>
                </Layout.Content>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => state.books.list;

export default withTranslation()(connect(mapStateToProps)(BookListPage));