import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Login from './pages/Login';
import Protected from './pages/Protected';
import configureStore from './configureStore';
import './App.css';

const store = configureStore({})

class App extends React.Component {
  state = {
    user: null,
    setUser: user => this.setState({ user })
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/login" component={Login} />
          <AuthenticatedRoute path="/protected" component={Protected} />
        </Router>
      </Provider>
    );
  }
}

export default App;
