import React from "react";
import { Layout, PageHeader, Button, Progress } from "antd";
import { withTranslation } from "react-i18next";
import SearchableTable from "../../components/SearchableTable";
import { getBookList } from "../../actions";

const columns = (t) => [
  {
    title: t("books.isbn"),
    dataIndex: "isbn",
    align: "center",
    width: 120,
  },
  {
    title: t("books.title"),
    dataIndex: "title",
    searchable: true,
  },
  { title: t("books.author"), dataIndex: "author", searchable: true },
  {
    title: t("books.availability"),
    dataIndex: "availableCopies",
    width: 120,
    align: "center",
    render: (availableCopies, book) => (
      <Progress
        type="line"
        status={
          availableCopies === 0
            ? "exception"
            : availableCopies === book.totalCopies
            ? "success"
            : "normal"
        }
        percent={(availableCopies / book.totalCopies) * 100}
        format={() => `${availableCopies}/${book.totalCopies}`}
      />
    ),
  },
  {
    title: t("books.price"),
    dataIndex: "price",
    render: (price) =>
      `${
        t("decimals-with-comma")
          ? price.toFixed(2).replace(".", ",")
          : price.toFixed(2)
      } €`,
    align: "center",
    width: 100,
  },
];

class BookListPage extends React.Component {
  state = { showCreateModal: false };
  componentDidMount() {
    this.props.dispatch(getBookList("arnau-test"));
  }

  render() {
    const { t, isFetching, data } = this.props;
    const sortedData = data.sort((a, b) => a.isbn - b.isbn);
    return (
      <React.Fragment>
        <div style={{ width: "100%", background: "#fff" }}>
          <PageHeader
            title={t("books.books")}
            style={{ maxWidth: 1200, margin: "auto" }}
          />
        </div>
        <Layout.Content
          style={{
            margin: "24px auto 24px auto",
            background: "#fff",
            padding: 24,
            maxWidth: "1200px",
          }}
        >
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.setState({ showCreateModal: true })}
            style={{ marginBottom: 16 }}
          >
            {t("books.add-book")}
          </Button>
          <SearchableTable
            rowKey="isbn"
            dataSource={sortedData}
            scroll={{ x: true, scrollToFirstRowOnChange: true }}
            loading={isFetching}
            columns={columns(t)}
            getColumnName={(x) => t(`books.${x}`)}
          />
        </Layout.Content>
      </React.Fragment>
    );
  }
}

export default withTranslation()(BookListPage);
