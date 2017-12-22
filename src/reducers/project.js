import _ from 'lodash';
import { injectReducer, runSaga, StoreInfo } from '../store';
import { createActions, handleActions } from 'redux-actions';
import { call, put } from 'redux-saga/effects';

function createProjectReducer() {
    const projectCreateAction = 'PROJECT_CREATE';
    const projectDeleteAction = 'PROJECT_DELETE';
    const projectRenameAction = 'PROJECT_RENAME';
    const projectGarbageCollectAction = 'PROJECT_GARBAGE_COLLECT';

    const actions = createActions({
        [projectCreateAction]: uuid => ({ uuid }),
        [projectRenameAction]: (uuid, name) => ({ uuid, name }),
        [projectDeleteAction]: uuid => ({ uuid }),
        [projectGarbageCollectAction]: () => {}
    });

    const projectCreate = actions[_.camelCase(projectCreateAction)];
    const projectDelete = actions[_.camelCase(projectDeleteAction)];
    const projectRename = actions[_.camelCase(projectRenameAction)];
    const projectGarbageCollect = actions[_.camelCase(projectGarbageCollectAction)];

    let reducer = handleActions(
        {
            [projectCreate]: (state, { payload: { uuid } }) => {
                return Object.assign({}, state, { [uuid]: { deleted: false, name: 'Project Name' } });
            },
            [projectRename]: (state, { payload: { uuid, name } }) => {
                let project = Object.assign({}, state[uuid], { deleted: false, name });
                return Object.assign({}, state, { [uuid]: project });
            },
            [projectDelete]: (state, { payload: { uuid } }) => {
                let project = Object.assign({}, state[uuid], { deleted: true });
                return Object.assign({}, state, { [uuid]: project });
            },
            [projectGarbageCollect]: (state) => {
                let newState = {};
                _.each(state, (project, uuid) => {
                    if(!project.deleted) {
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
