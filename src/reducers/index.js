import LoginReducer from './login';
import RegisterReducer from './register';

const login = new LoginReducer();
login.initializeReducer();

const register = new RegisterReducer();
register.initializeReducer();

export default { login, register };
