import _ from 'lodash';
import { injectReducer } from '../store';
import { createActions, handleActions } from 'redux-actions';

const STATE_PATH = 'app.local.tools';

function createToolReducer() {
    let actionNames = {
        toolCreateAction: 'TOOL_CREATE',
        toolDeleteAction: 'TOOL_DELETE',
        toolProjectDeleteAction: 'TOOL_PROJECT_DELETE',
        toolConfigureAction: 'TOOL_CONFIGURE',
        toolGarbageCollectAction: 'TOOL_GARBAGE_COLLECT'
    };

    const actions = createActions({
        [actionNames.toolCreateAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.toolConfigureAction]: (uuid, name, data) => ({ uuid, name, data }),
        [actionNames.toolDeleteAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.toolGarbageCollectAction]: uuid => ({ uuid }),
        [actionNames.toolProjectDeleteAction]: uuid => ({ uuid })
    });

    const toolCreate = actions[_.camelCase(actionNames.toolCreateAction)];
    const toolConfigure = actions[_.camelCase(actionNames.toolConfigureAction)];
    const toolDelete = actions[_.camelCase(actionNames.toolDeleteAction)];
    const toolGarbageCollect = actions[_.camelCase(actionNames.toolGarbageCollectAction)];
    const toolProjectDelete = actions[_.camelCase(actionNames.toolProjectDeleteAction)];

    let reducer = handleActions(
        {
            [toolCreate]: (state, { payload: { uuid, name } }) => {
                let newTool = { deleted: false, name: _.startCase(name) };
                let tools = Object.assign({}, state[uuid], { [name]: newTool });
                return Object.assign({}, state, {
                    [uuid]: tools
                });
            },
            [toolConfigure]: (state, { payload: { uuid, name, data } }) => {
                let newTool = Object.assign({}, (state[uuid][name]: { deleted: false, ...data }));
                let tools = Object.assign({}, state[uuid], { [name]: newTool });
                return Object.assign({}, state, { [uuid]: tools });
            },
            [toolDelete]: (state, { payload: { uuid, name } }) => {
                let newTool = Object.assign({}, (state[uuid][name]: { deleted: true }));
                let tools = Object.assign({}, state[uuid], { [name]: newTool });
                return Object.assign({}, state, { [uuid]: tools });
            },
            [toolGarbageCollect]: (state, { payload: { uuid } }) => {
                let tools = {};
                _.each(state[uuid], (doc, name) => {
                    if (!doc.deleted) {
                        tools[name] = doc;
                    }
                });
                return Object.assign({}, state, { [uuid]: tools });
            },
            [toolProjectDelete]: (state, { payload: { uuid } }) => {
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

let _reducer = createToolReducer();

export default _reducer;
