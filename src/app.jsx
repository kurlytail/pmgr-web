import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { StoreInfo, finalizeStore } from './store';
import './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/style.css';
import MainContainer from './containers/main';

import 'bootstrap';

import App from './main';

finalizeStore();

render(
    <Provider store={StoreInfo.store}>
        <ConnectedRouter history={StoreInfo.history}>
            <MainContainer />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

App.init();
