import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { StoreInfo, finalizeStore } from './store';
import './styles/style.css';
import MainContainer from './containers/main';

finalizeStore();

render(
    <Provider store={StoreInfo.store}>
        <ConnectedRouter history={StoreInfo.history}>
            <MainContainer />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
