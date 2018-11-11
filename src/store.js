import { createStore, combineReducers, applyMiddleware } from 'redux';
import _ from 'lodash';
import { composeWithDevTools } from 'redux-devtools-extension';
import TH from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { defaultReducers } from 'redux-rest-resource/lib/reducers';

const StoreInfo = {
    asyncReducers: {},
    store: null,
    history: createHistory()
};

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeWithDevTools(applyMiddleware(TH, sagaMiddleware, routerMiddleware(StoreInfo.history)));
const globalAsyncReducers = {};

Object.entries(defaultReducers).forEach(([key, action]) => {
    defaultReducers[key] = (state, a) => {
        state = action(state, a);
        if (a.status === 'rejected') {
            if (typeof a.body === 'string') {
                state.error = a.body;
            } else {
                state.error = { ...a.body };
            }
        } else {
            delete state.error;
        }
        return state;
    };
});

function createReducer(asyncReducers, pathPrefix) {
    const constructedReducers = {};

    _.each(asyncReducers, (reducer, key) => {
        const keyPath = `${pathPrefix}.${key}`;
        if (typeof reducer !== 'function') {
            constructedReducers[key] = createReducer(reducer, keyPath);
            globalAsyncReducers[keyPath] = constructedReducers[key];
        } else {
            constructedReducers[key] = reducer;
            globalAsyncReducers[keyPath] = constructedReducers[key];
        }
    });

    const reducer = combineReducers(constructedReducers);
    reducer.slice = pathPrefix;

    return reducer;
}

function checkReducer(path) {
    return globalAsyncReducers[`.${path}`];
}

function checkReducers(path) {
    /* Return all reducers Rooted at this path */
    const searchPath = `.${path}.`;
    return _.filter(globalAsyncReducers, (reducer, key) => _.startsWith(key, searchPath));
}

function injectReducer(path, asyncReducer) {
    const reducer = globalAsyncReducers[path];
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
