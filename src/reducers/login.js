import _ from 'lodash';
import { take, call, put, select } from 'redux-saga/effects';
import Axios from 'axios';
import { injectReducer, runSaga } from '../store';

class LoginReducer {
    static doLogin({ payload: { email, password } }) {
        return Axios.post('/auth/session', {
            email,
            password
        }).then(response => response.data);
    }

    static doLogout() {
        return Axios.delete('/auth/session');
    }

    *loginSaga() {
        // yield put(this.loginSuccess({ name: 'Ashwin Kamath' }));
        do {
            let account = yield select(_.get, `${this.STATE_PATH}.account`);

            let loginAction;
            if (!account) {
                loginAction = yield take([this.loginAction]);
            }

            try {
                if (!account) {
                    account = yield call(LoginReducer.doLogin, loginAction);
                    yield put(this.loginSuccess(account));
                }

                const logoutAction = yield take([this.logoutAction]);

                /* Start a rest transaction */
                yield call(LoginReducer.doLogout, logoutAction);
            } catch (ex) {
                yield put(this.loginFailure());
            }
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
        return {
            type: this.loginAction,
            payload: {
                email,
                password
            }
        };
    }

    static loginHandler(
        state,
        {
            payload: { email, password }
        }
    ) {
        return {
            email,
            password,
            pending: true
        };
    }

    logout() {
        return {
            type: this.logoutAction
        };
    }

    static logoutHandler() {
        return null;
    }

    loginSuccess(account) {
        return {
            type: this.loginSuccessAction,
            payload: {
                account
            }
        };
    }

    static loginSuccessHandler(state, { payload }) {
        return {
            account: payload.account
        };
    }

    loginFailure() {
        return {
            type: this.loginFailure
        };
    }

    static loginFailureHandler() {
        return {};
    }

    reducer(state = _.get(localStorage.getItem('pmgr'), this.LOCAL_STORAGE_PATH) || {}, action) {
        switch (action.type) {
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
        runSaga(this.loginSaga.bind(this));
    }
}

export default LoginReducer;
