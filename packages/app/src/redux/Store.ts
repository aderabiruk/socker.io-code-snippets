import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';

import RootReducer from './RootReducer';

/**
 * Middlewares
 */
const middlewares = [
    logger,
];

/**
 * Create Store
 */
export const Store = createStore(RootReducer, applyMiddleware(...middlewares));

/**
 * Create Persistor
 */
export const Persistor = persistStore(Store);