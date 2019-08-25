import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './pages/App';
import LoginPage from './pages/Login/LoginPage';
import configureStore from './configureStore';
import './DragonApp.css';

const store = configureStore({})

const DragonApp = () => (
	<Provider store={store}>
		<Router>
			<Route exact path="/login" component={LoginPage} />
			<App />
		</Router>
	</Provider>
);

export default DragonApp;
