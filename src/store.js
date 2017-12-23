'use strict';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import _ from 'lodash';
import { composeWithDevTools } from 'redux-devtools-extension';
import TH from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';

var StoreInfo = {
    asyncReducers: {},
    store: null,
    history: createHistory()
};

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(TH, sagaMiddleware, routerMiddleware(StoreInfo.history)));
var globalAsyncReducers = {};

/* Create a reducer, the heirarchy or reducers is visited and reducers
   are combined to create a tree of reducers. The reducers are retained
   so presumably all their associated states will be conserved */
function createReducer(asyncReducers, pathPrefix) {
    var constructedReducers = {};

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
    var searchPath = '.' + path + '.';
    return _.filter(globalAsyncReducers, (reducer, key) => _.startsWith(key, searchPath));
}

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
    var state = _.get(globalState, key);
    const serializedState = JSON.stringify(state);
    storage.setItem('pmgr', serializedState);
};

/* Inject a reducer in a path. Please keep the tree very shallow
   of the type <type-name>, if you need something more than a single
   tree, then you possibly dont understand what you are doing */
function injectReducer(path, asyncReducer) {
    /* Throw if there is already an object at the said path. We dont support
       replacing reducer as it does not play well with asynch operations and
       thunking */
    var reducer = globalAsyncReducers[path];
    if (reducer) return reducer;

    _.set(StoreInfo.asyncReducers, path, asyncReducer);
    reducer = createReducer(StoreInfo.asyncReducers, '');

    if (StoreInfo.store) {
        StoreInfo.store.replaceReducer(reducer);
    } else {
        const localState = loadStorage(localStorage);
        const sessionState = loadStorage(sessionStorage);

        StoreInfo.store = createStore(
            reducer,
            {
                app: {
                    local: localState,
                    session: sessionState
                },
                global: {
                    routing: {}
                }
            },
            enhancer
        );

        StoreInfo.store.subscribe(() => saveStorage(localStorage, StoreInfo.store.getState(), 'app.local'));
        StoreInfo.store.subscribe(() => saveStorage(sessionStorage, StoreInfo.store.getState(), 'app.session'));
    }

    return asyncReducer;
}

function runSaga(saga) {
    sagaMiddleware.run(saga);
}

/* This needs to be injected early because the router modules starts looking
   for state immediately on load */
injectReducer('routing', routerReducer);

export { StoreInfo, checkReducer, injectReducer, checkReducers, runSaga };

/* End */
