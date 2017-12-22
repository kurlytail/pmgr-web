import _ from 'lodash';
import { injectReducer } from '../store';
import { createActions, handleActions } from 'redux-actions';

function createProjectReducer() {
    const projectCreateAction = 'PROJECT_CREATE';
    const projectDeleteAction = 'PROJECT_DELETE';
    const projectConfigureAction = 'PROJECT_CONFIGURE';
    const projectGarbageCollectAction = 'PROJECT_GARBAGE_COLLECT';

    const actions = createActions({
        [projectCreateAction]: uuid => ({ uuid }),
        [projectConfigureAction]: (uuid, data) => ({ uuid, data }),
        [projectDeleteAction]: uuid => ({ uuid }),
        [projectGarbageCollectAction]: () => {}
    });

    const projectCreate = actions[_.camelCase(projectCreateAction)];
    const projectDelete = actions[_.camelCase(projectDeleteAction)];
    const projectConfigure = actions[_.camelCase(projectConfigureAction)];
    const projectGarbageCollect = actions[_.camelCase(projectGarbageCollectAction)];

    let reducer = handleActions(
        {
            [projectCreate]: (state, { payload: { uuid } }) => {
                return Object.assign({}, state, {
                    [uuid]: { deleted: false, name: 'Project Name', manager: 'oracle' }
                });
            },
            [projectConfigure]: (state, { payload: { uuid, data } }) => {
                let project = Object.assign({}, state[uuid], { deleted: false, ...data });
                return Object.assign({}, state, { [uuid]: project });
            },
            [projectDelete]: (state, { payload: { uuid } }) => {
                let project = Object.assign({}, state[uuid], { deleted: true });
                return Object.assign({}, state, { [uuid]: project });
            },
            [projectGarbageCollect]: state => {
                let newState = {};
                _.each(state, (project, uuid) => {
                    if (!project.deleted) {
                        newState[uuid] = project;
                    }
                });
                return newState;
            }
        },
        {}
    );

    injectReducer('app.local.projects', reducer);
    Object.assign(reducer, actions);

    return reducer;
}

let _reducer = createProjectReducer();

export default _reducer;
