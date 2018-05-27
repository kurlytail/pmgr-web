import _ from 'lodash';
import { injectReducer } from '../store';
import { createActions, handleActions } from 'redux-actions';
import generateName from 'project-name-generator';

const STATE_PATH = 'app.local.projects';
const NULL_UUID = '00000000-0000-0000-0000-000000000000';

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

    let reducer = handleActions(
        {
            [projectCreate]: (state, { payload: { uuid } }) => {
                return Object.assign({}, state, {
                    [uuid]: { deleted: false, name: generateName().dashed, manager: 'null', type: NULL_UUID }
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
        _.get(localStorage.getItem('pmgr'), STATE_PATH) || {}
    );

    injectReducer(STATE_PATH, reducer);
    Object.assign(reducer, actions, actionNames);

    return reducer;
}

let _reducer = createProjectReducer();

export default _reducer;
