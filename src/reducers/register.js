import { injectReducer } from '../store';
import { createResource } from 'redux-rest-resource';

class RegisterReducer {
    constructor() {
        this.STATE_PATH = 'app.register';

        const { actions, rootReducer } = createResource({
            name: 'register',
            pluralName: 'register',
            url: '/auth/register'
        });

        this.reducer = rootReducer;
        Object.assign(this, actions);
    }

    initializeReducer() {
        injectReducer(this.STATE_PATH, this.reducer.bind(this));
    }
}

export default RegisterReducer;
