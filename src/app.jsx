import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';
import { StoreInfo, finalizeStore } from './store';
import './reducers';
import './styles/style.css';
import MainContainer from './containers/main';
import LoginPanel from './containers/login-panel';
import RegistrationPanel from './containers/registration-panel';

import App from './main';

finalizeStore();

render(
    <Provider store={StoreInfo.store}>
        <ConnectedRouter history={StoreInfo.history}>
            <div>
                <Route path="/" component={MainContainer} />
                <Route path="/login" component={LoginPanel} />
                <Route path="/register" component={RegistrationPanel} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

App.init();
