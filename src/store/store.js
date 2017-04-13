import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {reducerOne} from '../reducers/reducerOne';
import logger from 'redux-logger'

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/saga';
import thunk from 'redux-thunk';


const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    combineReducers({reducerOne}),
    composeEnhancers(
        applyMiddleware(sagaMiddleware, logger, thunk)
    )
);

sagaMiddleware.run(rootSaga);

