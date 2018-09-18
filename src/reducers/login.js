import _ from 'lodash';
import { injectReducer, runSaga } from '../store';
import { take, call, put } from 'redux-saga/effects';
import Axios from 'axios';

class LoginReducer {

    doLogin({ payload : { email, password } }) {
        return Axios.post('/api/auth/session', {
            params : { email, password }
        });
    }

    doLogout() {
        return Axios.delete('/api/auth/session');
    }

    *loginSaga() {
        do {
            const loginAction = take([this.loginAction]);
            let account;

            try {
                account = yield call([this, this.doLogin], loginAction);
            } catch (ex) {
                yield put(this.loginFailure());
                continue;
            }
            yield put(this.loginSuccess(account));

            const logoutAction = take([this.logoutAction]);

            /* Start a rest transaction */
            yield call([this, this.doLogout], logoutAction);
            yield put(this.logout());

        } while (true);
    }

    constructor() {
        this.LOCAL_STORAGE_PATH = 'login';
        this.STATE_PATH = `app.local.${this.LOCAL_STORAGE_PATH}`;
        this.ACTION_ID = '909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48';

        this.loginAction = `LOGIN-${this.ACTION_ID}`;
        this.logoutAction = `LOGOUT-${this.ACTION_ID}`;
        this.loginSuccessAction = `LOGIN-SUCCESS-${this.ACTION_ID}`;
        this.loginFailureAction = `LOGIN-FAILURE-${this.ACTION_ID}`;
    }

    login(email, password) {
        return { type: this.loginAction, payload : { email, password } };
    }

    static loginHandler(state, { payload: { email, password } }) {
        return { email, password };
    }

    logout() {
        return { type: this.logoutAction };
    }

    static logoutHandler() {
        return {};
    }

    loginSuccess(account) {
        return { type: this.loginSuccess, payload: { account } };
    }

    static loginSuccessHandler(state, { payload: account }) {
        return { account };
    }

    loginFailure() {
        return { type: this.logoutSuccess };
    }

    static loginFailureHandler() {
        return {};
    }

    reducer(state = _.get(localStorage.getItem('pmgr'), this.LOCAL_STORAGE_PATH) || {}, action) {
        switch(action.type) {
            case this.loginAction:
            return LoginReducer.loginHandler(state, action);

            case this.logoutAction:
            return LoginReducer.logoutHandler(state, action);

            case this.loginSuccessAction:
            return LoginReducer.loginSuccessHandler(state, action);

            case this.loginFailureAction:
            return LoginReducer.loginFailureHandler(state, action);

            default:
            return state;
        }
    }

    initializeReducer() {
        injectReducer(this.STATE_PATH, this.reducer.bind(this));
        runSaga(this.loginSaga);
    }
}

export default LoginReducer;
