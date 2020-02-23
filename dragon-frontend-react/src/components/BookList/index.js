import React from "react";
import { Layout, Button, Tag, Popconfirm } from "antd";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Media from "react-media";
import { getBookList } from "../../actions";
import SearchableTable from "../SearchableTable";
import BookFormModal from '../BookFormModal';

const columns = t => [
  {
    title: t("books.isbn"),
    dataIndex: "isbn",
    render: id => <Link to={`/books/${id}`}>{id}</Link>,
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.isbn - b.isbn,
    align: "center",
    width: 200
  },
  {
    title: t("books.title"),
    dataIndex: "title",
    render: (name, shop) => (
      <span>
        {name} &nbsp;{" "}
        {shop.isActive && <Tag color="green">{t("shops.active")}</Tag>}
      </span>
    ),
    searchable: true
  }
];

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCreateModal: false, selection: [] };
    this.renderButtons = this.renderButtons.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getBookList(this.props.shop));
  }

  renderButtons() {
    const { t, isAdmin, data } = this.props;
    const deletedDisabled = this.state.selection.length === 0;
    return (
      isAdmin &&
      data && (
        <React.Fragment>
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.setState({ showCreateModal: true })}
            style={{ marginBottom: 16 }}
          >
            {t("books.add-book")}
          </Button>
          <Popconfirm
            title={t("books.delete-confirmation")}
            disabled={deletedDisabled}
          >
            <Button
              type="danger"
              icon="delete"
              disabled={deletedDisabled}
              style={{ marginBottom: 16, marginLeft: 16 }}
            >
              {t("books.delete-books")}
            </Button>
          </Popconfirm>
        </React.Fragment>
      )
    );
  }

  render() {
    const { t, isFetching, data, isAdmin } = this.props;
    return (
      <Layout.Content
        style={{
          margin: "24px auto 24px auto",
          background: "#fff",
          padding: 24,
          maxWidth: "1200px"
        }}
      >
        {this.renderButtons()}
        <Media query="(min-width: 600px)">
          {matches => {
            let columnsToRender = [...columns(t)];
            if (matches)
              columnsToRender.push({
                title: t("books.author"),
                dataIndex: "author",
                searchable: true
              });

            return (
              <SearchableTable
                rowKey="isbn"
                rowSelection={
                  isAdmin && {
                    onChange: selection => this.setState({ selection })
                  }
                }
                dataSource={data}
                loading={isFetching}
                columns={columnsToRender}
                getColumnName={x => t(`books.${x}`)}
              />
            );
          }}
        </Media>
        <BookFormModal
          formState={{}}
          visible={this.state.showCreateModal}
          // handleSubmit={shop => dispatch(createShop(shop))}
          handleClose={() => this.setState({ showCreateModal: false })}
        />
      </Layout.Content>
    );
  }
}

const mapStateToProps = state => ({
  ...state.books.list,
  isAdmin: state.user.isAdmin
});

export default withTranslation()(connect(mapStateToProps)(BookList));
