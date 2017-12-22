import _ from 'lodash';
import { injectReducer } from '../store';
import { createActions, handleActions } from 'redux-actions';
import createProjectReducer from './project';

function createProjectListReducer() {
    const projectCreateAction = 'PROJECT_CREATE';
    const projectDeleteAction = 'PROJECT_DELETE';
    const actions = createActions({
        [projectCreateAction]: uuid => ({ uuid }),
        [projectDeleteAction]: uuid => ({ uuid })
    });

    const projectCreate = actions[_.camelCase(projectCreateAction)];
    const projectDelete = actions[_.camelCase(projectDeleteAction)];

    let reducer = handleActions({
        [projectCreate]: (state, { payload: { uuid } }) => {
            return Object.assign({}, state, { [uuid]: { deleted: false } });
        },
        [projectDelete]: (state, { payload: { uuid } }) => {
            let project = Object.assign({}, state[uuid], { deleted: true });
            return Object.assign({}, state, { [uuid]: project });
        }
    }, {});

    injectReducer('app.local.projects', reducer);
    Object.assign(reducer, actions);

    return reducer;
}

let _reducer = createProjectListReducer();
export default _reducer;
