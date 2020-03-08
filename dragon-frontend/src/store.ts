import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createRootReducer from './reducers';
import rootSaga from './sagas';

export const history = createBrowserHistory();

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewareEnhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware);

  const enhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(createRootReducer(history), enhancers);
  sagaMiddleware.run(rootSaga);

  return store;
};
