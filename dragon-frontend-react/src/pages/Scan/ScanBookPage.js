import React from "react";
import { Layout, PageHeader, Alert, Spin, Result } from "antd";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { getBook } from "../../actions";
import { getDevices } from "../../components/barcode/helpers";
import BarcodeScanner from "../../components/barcode/BarcodeScanner";

const verticalCenterStyle = {
  margin: 0,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)"
};

class ScanBookPage extends React.Component {
  state = { isbn: null, devices: [], currentDevice: null };

  componentDidMount() {
    getDevices().then(ids =>
      this.setState({
        devices: ids,
        currentDevice: ids.length > 0 ? 0 : null
      })
    );
  }

  changeDevice = () => {
    const { devices, currentDevice } = this.state;
    this.setState({
      currentDevice: currentDevice === devices.length - 1 ? 0 : (currentDevice + 1)
    })
  }

  searchBook = isbn => {
    if (!this.state.isbn) {
      this.props.dispatch(getBook("arnau-test", isbn));
      this.setState({ isbn });
    }
  };

  render() {
    const { t, books } = this.props;
    const { isbn, currentDevice, devices } = this.state;
    return (
      <React.Fragment>
        <div style={{ width: "100%", background: "#fff" }}>
          <PageHeader
            title={t("scan.scan")}
            style={{ maxWidth: 1200, margin: "auto" }}
          />
        </div>
        <Layout.Content
          style={{
            margin: "24px auto 0 auto",
            height: "100%",
            textAlign: "center",
            background: "#fff",
            padding: 24,
            maxWidth: "1200px"
          }}
        >
          <div style={{ margin: "auto", width: "fit-content" }}>
            <Alert
              message={t("scan.instructions")}
              type="info"
              showIcon
              style={{ marginBottom: 32 }}
            />
          </div>

          <button onClick={this.changeDevice}>Change device</button>
          <div
            id="camera-container"
            style={{ margin: "auto", textAlign: "center" }}
          >
            {currentDevice !== null && (
              <BarcodeScanner
                containerId="camera-container"
                onDetected={this.searchBook}
                deviceId={devices[currentDevice]}
                overlay={
                  isbn &&
                  books[isbn] && (
                    <div
                      className="overlay"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 0,
                        background: "white"
                      }}
                    >
                      {books[isbn].isFetching && (
                        <Spin style={verticalCenterStyle} size="large" />
                      )}
                      {isbn}
                      {books[isbn].data && (
                        <Result
                          status="success"
                          title={books[isbn].data.title}
                          subtitle={books[isbn].data.author}
                        />
                      )}
                    </div>
                  )
                }
              />
            )}
          </div>
        </Layout.Content>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ books: state.books });

export default withTranslation()(connect(mapStateToProps)(ScanBookPage));
