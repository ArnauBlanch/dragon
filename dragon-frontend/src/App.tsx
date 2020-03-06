import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import caES from 'antd/es/locale/ca_ES';
import './styles/App.css';
import { Locale } from 'antd/lib/locale-provider';
import createStore from './store';
import LoginPage from './pages/LoginPage';

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
        <Router>
          <Switch>
            <Route name="login" path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
