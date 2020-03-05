import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';

export default () => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(reducers, applyMiddleware(sagaMiddleware))
    return store;
}