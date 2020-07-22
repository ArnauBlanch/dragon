import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import caES from 'antd/es/locale/ca_ES';
import { Locale } from 'antd/lib/locale-provider';
import { ConnectedRouter } from 'connected-react-router';
import createStore, { history } from './store';
import LoginPage from './pages/Login/LoginPage';
import ScannerPage from './pages/ScannerPage';
import AppLayout from './pages/AppLayout';
import PrivateRoute from './components/PrivateRoute';
import ExamplePage from './pages/ExamplePage';

const languages: { [lng: string]: Locale } = {
  ca: caES,
};
const currentLng = process.env.REACT_APP_LANGUAGE;

const store = createStore();

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <ConfigProvider
        locale={currentLng && currentLng !== 'en' ? languages[currentLng] : undefined}
      >
        <ConnectedRouter history={history}>
          <Switch>
            <Route name="login" path="/login" component={LoginPage} />
            <PrivateRoute>
              <AppLayout>
                <>
                  <Route name="scan" path="/scan" component={ScannerPage} />
                  <Route name="example" path="/example" component={ExamplePage} />
                </>
              </AppLayout>
            </PrivateRoute>
          </Switch>
        </ConnectedRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
