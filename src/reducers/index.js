import LoginReducer from './login';
import { RegistrationReducer } from '@kurlytail/user-registration';
import debugExports from '@kurlytail/user-registration';
import { injectReducer } from '../store';

const login = new LoginReducer();
login.initializeReducer();

const register = new RegistrationReducer();
injectReducer(register.STATE_PATH, register.reducer.bind(register));

export default { login, register, debugExports };
