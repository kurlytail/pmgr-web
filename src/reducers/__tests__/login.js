import * as Store from '../../store';
import LoginReducer from '../login';

jest.mock('../../store');
jest.mock('redux-saga');

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
        localStorage.getItem = jest.fn(() => ({
            testState: 'test',
            login: {
                testState1: 'test1'
            }
        }));
    });

    describe('## constructor', () => {
        it('### should create default object', () => {
            expect(reducer).toMatchInlineSnapshot(`
LoginReducer {
  "ACTION_ID": "909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
  "LOCAL_STORAGE_PATH": "login",
  "STATE_PATH": "app.local.login",
  "loginAction": "LOGIN-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
  "loginFailureAction": "LOGIN-FAILURE-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
  "loginSuccessAction": "LOGIN-SUCCESS-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
  "logoutAction": "LOGOUT-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
}
`);
        });
    });

    describe('## initializeReducer', () => {
        it('## should create a login reducer', () => {
            reducer.initializeReducer();

            expect(reducer).toMatchInlineSnapshot(`
LoginReducer {
  "ACTION_ID": "909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
  "LOCAL_STORAGE_PATH": "login",
  "STATE_PATH": "app.local.login",
  "loginAction": "LOGIN-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
  "loginFailureAction": "LOGIN-FAILURE-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
  "loginSuccessAction": "LOGIN-SUCCESS-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
  "logoutAction": "LOGOUT-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
}
`);

            expect(Store.injectReducer).toHaveBeenCalled();
            expect(Store.runSaga).toHaveBeenCalled();
        });
    });

    describe('## login', () => {
        it('### should return login action arguments as an object', () => {
            const loginActionArgs = reducer.login('test@joe.com', 'password');
            expect(loginActionArgs).toMatchInlineSnapshot(`
Object {
  "payload": Object {
    "email": "test@joe.com",
    "password": "password",
  },
  "type": "LOGIN-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
}
`);
        });
    });

    describe('## logout', () => {
        it('### should return logout action arguments as an object', () => {
            const logoutActionArgs = reducer.logout();
            expect(logoutActionArgs).toMatchInlineSnapshot(`
Object {
  "type": "LOGOUT-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
}
`);
        });
    });

    describe('## reducer', () => {
        it('### should use default state when called with no args', () => {
            const newState = reducer.reducer(undefined, {
                action: '@@INIT'
            });

            expect(newState).toMatchInlineSnapshot('Object {}');
        });

        it('### should call loginHandler for loginAction', () => {
            const handlerSpy = jest.spyOn(LoginReducer, 'loginHandler');
            const newState = reducer.reducer(FIXTURES.state.dummy, {
                type: reducer.loginAction,
                payload: FIXTURES.loginPayload
            });

            expect(newState).toMatchInlineSnapshot(`
Object {
  "email": "test@joe.com",
  "password": "password",
}
`);
            expect(handlerSpy).toHaveBeenCalled();
        });

        it('### should call logoutHandler for logoutAction on completed logins', () => {
            const handlerSpy = jest.spyOn(LoginReducer, 'logoutHandler');
            const newState = reducer.reducer(FIXTURES.state.loginComplete, {
                type: reducer.logoutAction
            });

            expect(newState).toMatchInlineSnapshot('Object {}');
            expect(handlerSpy).toHaveBeenCalled();
        });

        it('### should call logoutHandler for logoutAction on pending logins', () => {
            const handlerSpy = jest.spyOn(LoginReducer, 'logoutHandler');
            const newState = reducer.reducer(FIXTURES.state.loginPending, {
                type: reducer.logoutAction
            });

            expect(newState).toMatchInlineSnapshot('Object {}');
            expect(handlerSpy).toHaveBeenCalled();
        });

        it('### should call loginSuccessHandler for loginSuccessAction on pending logins', () => {
            const handlerSpy = jest.spyOn(LoginReducer, 'loginSuccessHandler');
            const newState = reducer.reducer(FIXTURES.state.loginPending, {
                type: reducer.loginSuccessAction,
                payload: FIXTURES.loginSuccessPayload
            });

            expect(newState).toMatchInlineSnapshot(`
Object {
  "account": Object {
    "name": "test success",
  },
}
`);
            expect(handlerSpy).toHaveBeenCalled();
        });

        it('### should call loginFailureHandler for loginFailureAction on pending logins', () => {
            const handlerSpy = jest.spyOn(LoginReducer, 'loginFailureHandler');
            const newState = reducer.reducer(FIXTURES.state.loginPending, {
                type: reducer.loginFailureAction
            });

            expect(newState).toMatchInlineSnapshot('Object {}');
            expect(handlerSpy).toHaveBeenCalled();
        });
    });

    describe('## loginSaga', () => {
        it('### should traverse login/logout machine', () => {
            const saga = reducer.loginSaga();
            expect(saga).toMatchInlineSnapshot('Object {}');

            let next = saga.next({
                payload: FIXTURES.loginPayload
            });
            expect(next.value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "SELECT": Object {
    "args": Array [
      "app.local.login.account",
    ],
    "selector": [Function],
  },
}
`);

            next = saga.next(FIXTURES.account);
            expect(next.value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "TAKE": Object {
    "pattern": Array [
      "LOGOUT-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
    ],
  },
}
`);
            next = saga.next('put response');
            expect(next.value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "CALL": Object {
    "args": Array [
      "put response",
    ],
    "context": null,
    "fn": [Function],
  },
}
`);

            /* Logout here */
            next = saga.next('logging out');
            expect(next.value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "SELECT": Object {
    "args": Array [
      "app.local.login.account",
    ],
    "selector": [Function],
  },
}
`);
            next = saga.next('logout rest response');
            expect(next.value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "TAKE": Object {
    "pattern": Array [
      "LOGOUT-909EA664-44C5-4F7F-BF9E-BA5FF5F3AC48",
    ],
  },
}
`);

            /* Back to login */
            next = saga.next('logging in again');
            expect(next.value).toMatchInlineSnapshot(`
Object {
  "@@redux-saga/IO": true,
  "CALL": Object {
    "args": Array [
      "logging in again",
    ],
    "context": null,
    "fn": [Function],
  },
}
`);
        });
    });
});
