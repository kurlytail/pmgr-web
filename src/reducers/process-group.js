import _ from 'lodash';
import { injectReducer } from '../store';
import { createActions, handleActions } from 'redux-actions';

const STATE_PATH = 'app.local.processGroups';

function createProcessGroupReducer() {
    let actionNames = {
        processGroupCreateAction: 'PROCESS_GROUP_CREATE',
        processGroupDeleteAction: 'PROCESS_GROUP_DELETE',
        processGroupProjectDeleteAction: 'PROCESS_GROUP_PROJECT_DELETE',
        processGroupConfigureAction: 'PROCESS_GROUP_CONFIGURE',
        processGroupGarbageCollectAction: 'PROCESS_GROUP_GARBAGE_COLLECT'
    };

    const actions = createActions({
        [actionNames.processGroupCreateAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.processGroupConfigureAction]: (uuid, name, data) => ({ uuid, name, data }),
        [actionNames.processGroupDeleteAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.processGroupGarbageCollectAction]: uuid => ({ uuid }),
        [actionNames.processGroupProjectDeleteAction]: uuid => ({ uuid })
    });

    const processGroupCreate = actions[_.camelCase(actionNames.processGroupCreateAction)];
    const processGroupConfigure = actions[_.camelCase(actionNames.processGroupConfigureAction)];
    const processGroupDelete = actions[_.camelCase(actionNames.processGroupDeleteAction)];
    const processGroupGarbageCollect = actions[_.camelCase(actionNames.processGroupGarbageCollectAction)];
    const processGroupProjectDelete = actions[_.camelCase(actionNames.processGroupProjectDeleteAction)];

    let reducer = handleActions(
        {
            [processGroupCreate]: (state, { payload: { uuid, name } }) => {
                let newProcessGroup = { deleted: false, name: _.startCase(name) };
                let processGroups = Object.assign({}, state[uuid], { [name]: newProcessGroup });
                return Object.assign({}, state, {
                    [uuid]: processGroups
                });
            },
            [processGroupConfigure]: (state, { payload: { uuid, name, data } }) => {
                let newProcessGroup = Object.assign({}, state[uuid][name], { deleted: false, ...data });
                let processGroups = Object.assign({}, state[uuid], { [name]: newProcessGroup });
                return Object.assign({}, state, { [uuid]: processGroups });
            },
            [processGroupDelete]: (state, { payload: { uuid, name } }) => {
                let newProcessGroup = Object.assign({}, state[uuid][name], { deleted: true });
                let processGroups = Object.assign({}, state[uuid], { [name]: newProcessGroup });
                return Object.assign({}, state, { [uuid]: processGroups });
            },
            [processGroupGarbageCollect]: (state, { payload: { uuid } }) => {
                let processGroups = {};
                _.each(state[uuid], (doc, name) => {
                    if (!doc.deleted) {
                        processGroups[name] = doc;
                    }
                });
                return Object.assign({}, state, { [uuid]: processGroups });
            },
            [processGroupProjectDelete]: (state, { payload: { uuid } }) => {
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

let _reducer = createProcessGroupReducer();

export default _reducer;
