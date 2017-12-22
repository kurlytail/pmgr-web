
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';
import { hashHistory as importedHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ProjectList from './containers/project-list.jsx';
import { StoreInfo } from './store';
import { HashRouter, Route } from 'react-router-dom';

//import 'uikit';
import './styles/uikit-theme.less';
import './reducers/project-list';

render(
    <Provider store={StoreInfo.store}>
        <HashRouter>
            <Route path="/" component={ProjectList} />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
