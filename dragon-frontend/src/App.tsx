import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import caES from 'antd/es/locale/ca_ES';
import './styles/App.css';

function App() {
  return (
    <Provider store={undefined}>
      <ConfigProvider locale={caES}>
        <Router>
          <Switch>
            <Route name="login" path="/login" component={undefined} />
          </Switch>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
