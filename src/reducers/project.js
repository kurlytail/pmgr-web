import _ from 'lodash';
import { injectReducer, StoreInfo } from '../store';
import { createActions, handleActions } from 'redux-actions';

function createProjectReducer() {
    let actionNames = {
        projectCreateAction: 'PROJECT_CREATE',
        projectDeleteAction: 'PROJECT_DELETE',
        projectConfigureAction: 'PROJECT_CONFIGURE',
        projectGarbageCollectAction: 'PROJECT_GARBAGE_COLLECT'
    };

    const actions = createActions({
        [actionNames.projectCreateAction]: uuid => ({ uuid }),
        [actionNames.projectConfigureAction]: (uuid, data) => ({ uuid, data }),
        [actionNames.projectDeleteAction]: uuid => ({ uuid }),
        [actionNames.projectGarbageCollectAction]: uuid => ({ uuid })
    });

    const projectCreate = actions[_.camelCase(actionNames.projectCreateAction)];
    const projectDelete = actions[_.camelCase(actionNames.projectDeleteAction)];
    const projectConfigure = actions[_.camelCase(actionNames.projectConfigureAction)];
    const projectGarbageCollect = actions[_.camelCase(actionNames.projectGarbageCollectAction)];

    let defaultState = _.get(StoreInfo.store.getState(), 'app.local.projects');
    defaultState = defaultState ? defaultState : {};

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
            [projectGarbageCollect]: (state, { payload: { uuid } }) => {
                if (state[uuid] && state[uuid].deleted) {
                    let newState = _.clone(state);
                    delete newState[uuid];
                    return newState;
                }
                return state;
            }
        },
        defaultState
    );

    injectReducer('app.local.projects', reducer);
    Object.assign(reducer, actions, actionNames);

    return reducer;
}

let _reducer = createProjectReducer();

export default _reducer;
