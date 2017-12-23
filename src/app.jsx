import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { StoreInfo } from './store';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from './containers/main.jsx';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import './reducers';
import './managers';

render(
    <Provider store={StoreInfo.store}>
        <ConnectedRouter history={StoreInfo.history}>
            <MainContainer/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
