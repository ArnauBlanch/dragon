import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import caES from 'antd/es/locale/ca_ES';
import './styles/App.css';
import { Locale } from 'antd/lib/locale-provider';
import { ConnectedRouter } from 'connected-react-router';
import createStore, { history } from './store';
import LoginPage from './pages/LoginPage';
import ScannerPage from './pages/ScannerPage';
import ScannerSuccessPage from './pages/ScannerSuccessPage';
import ScannerErrorPage from './pages/ScannerErrorPage';
import ScannerLoadingPage from './pages/ScannerLoadingPage';
import ScannerFoundPage from './pages/ScannerFoundPage';
import AppLayout from './pages/AppLayout';

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
            <AppLayout>
              <>
                <Route name="scan" path="/scan" component={ScannerPage} />
                <Route name="scan-success" path="/scan-success" component={ScannerSuccessPage} />
                <Route name="scan-error" path="/scan-error" component={ScannerErrorPage} />
                <Route name="scan-loading" path="/scan-loading" component={ScannerLoadingPage} />
                <Route name="scan-found" path="/scan-found" component={ScannerFoundPage} />
              </>
            </AppLayout>
          </Switch>
        </ConnectedRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
