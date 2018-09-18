jest.mock('../../store');
jest.mock('redux-saga');
jest.mock('axios');

import * as Store from '../../store';
import LoginReducer from '../login';
import * as ReduxSaga from 'redux-saga';
import Axios from 'axios';

const FIXTURES = {
    state: {
        dummy: {
            dummy: 'dummy'
        },
        loginPending: {
            email: 'test@joe.com',
            password: 'password'
        },
        loginComplete: {
            account: {
                name: 'test'
            }
        }
    },
    loginPayload: {
        email: 'test@joe.com',
        password: 'password'
    },
    loginSuccessPayload: {
        account: {
            name: 'test success'
        }
    },
    account: {
        name: 'name',
        role: 'role'
    }
};

describe('# LoginReducer', () => {

    let reducer;
    beforeEach(() => {
        reducer = new LoginReducer();
        localStorage.getItem.mockReturnValue({
            testState: 'test',
            login: {
                testState1: 'test1'
            }
        });
    });

    describe('## constructor', () => {
        it('### should create default object', () => {
            expect(reducer).toMatchSnapshot();
        });
    });

    describe('## initializeReducer', () => {
        it('## should create a login reducer', () => {
            reducer.initializeReducer();

            expect(reducer).toMatchSnapshot();

            expect(Store.injectReducer).toHaveBeenCalled();
            expect(Store.runSaga).toHaveBeenCalled();
        });
    });

    describe('## login', () => {
        it('### should return login action arguments as an object', () => {
            const loginActionArgs = reducer.login('test@joe.com', 'password');
            expect(loginActionArgs).toMatchSnapshot();
        });
    });

    describe('## logout', () => {
        it('### should return logout action arguments as an object', () => {
            const logoutActionArgs = reducer.logout();
            expect(logoutActionArgs).toMatchSnapshot();
        });

    });

    describe('## reducer', () => {
        it('### should use default state when called with no args', () => {

            const newState = reducer.reducer(undefined, {
                action: '@@INIT'
            });

            expect(newState).toMatchSnapshot();
        });

        it('### should call loginHandler for loginAction', () => {

            const handlerSpy = jest.spyOn(LoginReducer, 'loginHandler');
            const newState = reducer.reducer(FIXTURES.state.dummy, {
                type: reducer.loginAction,
                payload: FIXTURES.loginPayload
            });

            expect(newState).toMatchSnapshot();
            expect(handlerSpy).toHaveBeenCalled();
        });

        it('### should call logoutHandler for logoutAction on completed logins', () => {

            const handlerSpy = jest.spyOn(LoginReducer, 'logoutHandler');
            const newState = reducer.reducer(FIXTURES.state.loginComplete, {
                type: reducer.logoutAction
            });

            expect(newState).toMatchSnapshot();
            expect(handlerSpy).toHaveBeenCalled();
        });

        it('### should call logoutHandler for logoutAction on pending logins', () => {

            const handlerSpy = jest.spyOn(LoginReducer, 'logoutHandler');
            const newState = reducer.reducer(FIXTURES.state.loginPending, {
                type: reducer.logoutAction
            });

            expect(newState).toMatchSnapshot();
            expect(handlerSpy).toHaveBeenCalled();
        });

        it('### should call loginSuccessHandler for loginSuccessAction on pending logins', () => {

            const handlerSpy = jest.spyOn(LoginReducer, 'loginSuccessHandler');
            const newState = reducer.reducer(FIXTURES.state.loginPending, {
                type: reducer.loginSuccessAction,
                payload: FIXTURES.loginSuccessPayload
            });

            expect(newState).toMatchSnapshot();
            expect(handlerSpy).toHaveBeenCalled();
        });

        it('### should call loginFailureHandler for loginFailureAction on pending logins', () => {

            const handlerSpy = jest.spyOn(LoginReducer, 'loginFailureHandler');
            const newState = reducer.reducer(FIXTURES.state.loginPending, {
                type: reducer.loginFailureAction
            });

            expect(newState).toMatchSnapshot();
            expect(handlerSpy).toHaveBeenCalled();
        });
    });

    describe('## loginSaga', () => {
        it('### should traverse login/logout machine', () => {
            const saga = reducer.loginSaga();
            expect(saga).toMatchSnapshot();

            let next = saga.next({
                payload: FIXTURES.loginPayload
            });
            expect(next.value).toMatchSnapshot();

            next = saga.next(FIXTURES.account);
            expect(next.value).toMatchSnapshot();

            /* Logout here */
            next = saga.next('logging out');
            expect(next.value).toMatchSnapshot();
            next = saga.next('logout rest response');
            expect(next.value).toMatchSnapshot();

            /* Back to login */
            next = saga.next('logging in again');
            expect(next.value).toMatchSnapshot();
        });
    });

    afterEach(() => {
        localStorage.getItem.mockReset();
    });
});
