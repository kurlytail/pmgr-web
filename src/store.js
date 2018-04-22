'use strict';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import _ from 'lodash';
import { composeWithDevTools } from 'redux-devtools-extension';
import TH from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

const StoreInfo = {
    asyncReducers: {},
    store: null,
    history: createHistory()
};

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(TH, sagaMiddleware, routerMiddleware(StoreInfo.history)));
const globalAsyncReducers = {};

function createReducer(asyncReducers, pathPrefix) {
    const constructedReducers = {};

    _.each(asyncReducers, (reducer, key) => {
        let keyPath = pathPrefix + '.' + key;
        if (typeof reducer !== 'function') {
            constructedReducers[key] = createReducer(reducer, keyPath);
            globalAsyncReducers[keyPath] = constructedReducers[key];
        } else {
            constructedReducers[key] = reducer;
            globalAsyncReducers[keyPath] = constructedReducers[key];
        }
    });

    let reducer = combineReducers(constructedReducers);
    reducer.slice = pathPrefix;

    return reducer;
}

function checkReducer(path) {
    return globalAsyncReducers['.' + path];
}

function checkReducers(path) {
    /* Return all reducers Rooted at this path */
    const searchPath = '.' + path + '.';
    return _.filter(globalAsyncReducers, (reducer, key) => _.startsWith(key, searchPath));
}

function injectReducer(path, asyncReducer) {
    let reducer = globalAsyncReducers[path];
    if (reducer) return reducer;

    _.set(StoreInfo.asyncReducers, path, asyncReducer);

    return asyncReducer;
}

const allSagas = [];
function runSaga(saga) {
    allSagas.push(saga);
}

function finalizeStore() {
    const loadStorage = storage => {
        try {
            const serializedState = storage.getItem('pmgr');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    };

    const saveStorage = (storage, globalState, key) => {
        const state = _.get(globalState, key);
        const serializedState = JSON.stringify(state);
        storage.setItem('pmgr', serializedState);
    };

    const localState = loadStorage(localStorage);

    StoreInfo.store = createStore(
        createReducer(StoreInfo.asyncReducers, ''),
        {
            app: {
                local: localState
            }
        },
        enhancer
    );

    StoreInfo.store.subscribe(() => saveStorage(localStorage, StoreInfo.store.getState(), 'app.local'));

    allSagas.forEach(saga => sagaMiddleware.run(saga));
}

injectReducer('routing', routerReducer);

export { StoreInfo, checkReducer, injectReducer, checkReducers, runSaga, finalizeStore };

/* End */
