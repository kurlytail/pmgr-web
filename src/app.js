import { ProjectReducer } from './index';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import Saga from './saga';
import GenericManager from './managers/generic';
import thunk from 'redux-thunk';

const middlewares = [thunk, Saga];

if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({ colors: false });
    middlewares.push(logger);
}

const store = createStore(ProjectReducer, applyMiddleware(...middlewares));

Saga.run(GenericManager);

// Start by creating a project
store.dispatch({ type: 'PROJECT_INIT', name: 'Sample project' });
