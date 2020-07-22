import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider, message } from "antd";
import caES from "antd/es/locale/ca_ES";
import App from "./pages/App";
import LoginPage from "./pages/Login/LoginPage";
import configureStore from "./configureStore";
import "./DragonApp.css";
import BookListPage from "./pages/Books/BookListPage";
import ShopListPage from "./pages/Shops/ShopListPage";
import ShopDetailsPage from "./pages/Shops/ShopDetailsPage";
import ScanBookPage from "./pages/Scan/ScanBookPage";

const store = configureStore({});
message.config({ top: 74 });

const DragonApp = () => (
  <Provider store={store}>
    <ConfigProvider locale={caES}>
      <Router>
        <Switch>
          <Route name="login" path="/login" component={LoginPage} />
          <App>
            <Route path="/scan" component={ScanBookPage} />
            <Route path="/books" exact component={BookListPage} />
            <Route path="/sales" render={() => <h1>Vendes</h1>} />
            <Route path="/shops" exact component={ShopListPage} />
            <Route path="/shops/:shopId" component={ShopDetailsPage} />
          </App>
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>
);

export default DragonApp;
