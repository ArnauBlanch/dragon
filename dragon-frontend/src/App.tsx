import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createStore, { history } from './store';
import LoginPage from './pages/Login/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const AppLayout = lazy(() => import('./components/AppLayout'));
const ScannerPage = lazy(() => import('./pages/ScannerPage'));

const store = createStore();

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route name="login" path="/login" component={LoginPage} />
          <PrivateRoute>
            <Suspense fallback={<b>Loading...</b>}>
              <AppLayout>
                <>
                  <Route name="scan" path="/scan" component={ScannerPage} />
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
