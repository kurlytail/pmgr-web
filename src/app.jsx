
import { render } from 'react-dom';
import { StoreInfo, finalizeStore } from './store';
import './styles/style.css';

import './reducers';
import './managers';

finalizeStore();

render(
    <Provider store={StoreInfo.store}>
        <ConnectedRouter history={StoreInfo.history}>
            <MainContainer />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
