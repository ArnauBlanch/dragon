import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createStore, { history } from './store';
import LoginPage from './pages/Login/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const AppLayout = lazy(() => import('./components/AppLayout'));
const ScannerPage = lazy(() => import('./pages/ScannerPage'));
const BookScannedPage = lazy(() => import('./pages/BookScanned/BookScannedPage'));

const store = createStore();

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route name="login" path="/login" component={LoginPage} />
          <PrivateRoute>
            <Suspense fallback={<div />}>
              <AppLayout>
                <>
                  <Route name="scan" path="/scan" exact component={ScannerPage} />
                  <Route name="scan-success" path="/scan/:isbn" component={BookScannedPage} />
                </>
              </AppLayout>
            </Suspense>
          </PrivateRoute>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
