import React from "react";
import { PageHeader } from "antd";
import { withTranslation } from "react-i18next";
import BookList from "../../components/BookList";

class BookListPage extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div style={{ width: "100%", background: "#fff" }}>
          <PageHeader
            title={t("books.books")}
            style={{ maxWidth: 1200, margin: "auto" }}
          />
        </div>
        <BookList shop="DevOpsTestShop" />
      </React.Fragment>
    );
  }
}

export default withTranslation()(BookListPage);
