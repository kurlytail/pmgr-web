import _ from 'lodash';
import { injectReducer } from '../store';
import { createActions, handleActions } from 'redux-actions';

const STATE_PATH = 'app.local.processes';

function createProcessReducer() {
    let actionNames = {
        processCreateAction: 'PROCESS_CREATE',
        processDeleteAction: 'PROCESS_DELETE',
        processProjectDeleteAction: 'PROCESS_PROJECT_DELETE',
        processConfigureAction: 'PROCESS_CONFIGURE',
        processGarbageCollectAction: 'PROCESS_GARBAGE_COLLECT'
    };

    const actions = createActions({
        [actionNames.processCreateAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.processConfigureAction]: (uuid, name, data) => ({ uuid, name, data }),
        [actionNames.processDeleteAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.processGarbageCollectAction]: uuid => ({ uuid }),
        [actionNames.processProjectDeleteAction]: uuid => ({ uuid })
    });

    const processCreate = actions[_.camelCase(actionNames.processCreateAction)];
    const processConfigure = actions[_.camelCase(actionNames.processConfigureAction)];
    const processDelete = actions[_.camelCase(actionNames.processDeleteAction)];
    const processGarbageCollect = actions[_.camelCase(actionNames.processGarbageCollectAction)];
    const processProjectDelete = actions[_.camelCase(actionNames.processProjectDeleteAction)];

    let reducer = handleActions(
        {
            [processCreate]: (state, { payload: { uuid, name } }) => {
                let newProcess = { deleted: false, name: _.startCase(name) };
                let processs = Object.assign({}, state[uuid], { [name]: newProcess });
                return Object.assign({}, state, {
                    [uuid]: processs
                });
            },
            [processConfigure]: (state, { payload: { uuid, name, data } }) => {
                let newProcess = Object.assign({}, state[uuid][name], { deleted: false, ...data });
                let processs = Object.assign({}, state[uuid], { [name]: newProcess });
                return Object.assign({}, state, { [uuid]: processs });
            },
            [processDelete]: (state, { payload: { uuid, name } }) => {
                let newProcess = Object.assign({}, state[uuid][name], { deleted: true });
                let processs = Object.assign({}, state[uuid], { [name]: newProcess });
                return Object.assign({}, state, { [uuid]: processs });
            },
            [processGarbageCollect]: (state, { payload: { uuid } }) => {
                let processs = {};
                _.each(state[uuid], (doc, name) => {
                    if (!doc.deleted) {
                        processs[name] = doc;
                    }
                });
                return Object.assign({}, state, { [uuid]: processs });
            },
            [processProjectDelete]: (state, { payload: { uuid } }) => {
                let newState = _.clone(state);
                delete newState[uuid];
                return newState;
            }
        },
        _.get(localStorage.getItem('pmgr'), STATE_PATH) || {}
    );

    injectReducer(STATE_PATH, reducer);
    Object.assign(reducer, actions, actionNames);

    return reducer;
}

let _reducer = createProcessReducer();

export default _reducer;
