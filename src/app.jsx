import { ProjectReducer } from './index';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import { hashHistory as importedHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import GenericManager from './managers/generic';
import thunk from 'redux-thunk';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Main from './containers/main.jsx';
import { StoreInfo, runSaga } from './store';
import {HashRouter, Route} from 'react-router-dom';

//import 'uikit';
import './styles/uikit-theme.less';
import './project';

runSaga(GenericManager);
StoreInfo.store.dispatch({ type: 'PROJECT_INIT', name: 'Sample project' });

render(
    <Provider store={StoreInfo.store}>
        <HashRouter>
            <Route path="/" component={Main} />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
