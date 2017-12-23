import _ from 'lodash';
import { injectReducer, StoreInfo } from '../store';
import { createActions, handleActions } from 'redux-actions';
import Elaborate from '../elaborate';

function createprojectTypeReducer() {
    const projectTypeCreateAction = 'PROJECT_TYPE_CREATE';
    const projectTypeDeleteAction = 'PROJECT_TYPE_DELETE';
    const projectTypeSetToolAction = 'PROJECT_TYPE_SET_TOOL';
    const projectTypeSetActivityAction = 'PROJECT_TYPE_SET_ACTIVITY';
    const projectTypeConfigureAction = 'PROJECT_TYPE_CONFIGURE';
    const projectTypeGarbageCollectAction = 'PROJECT_TYPE_GARBAGE_COLLECT';

    const actions = createActions({
        [projectTypeCreateAction]: uuid => ({ uuid }),
        [projectTypeSetToolAction]: (uuid, toolName, toolType) => ({ uuid, toolName, toolType }),
        [projectTypeSetActivityAction]: (uuid, activityName, activityType) => ({ uuid, activityName, activityType }),
        [projectTypeConfigureAction]: (uuid, data) => ({ uuid, data }),
        [projectTypeDeleteAction]: uuid => ({ uuid }),
        [projectTypeGarbageCollectAction]: () => {}
    });

    const projectTypeCreate = actions[_.camelCase(projectTypeCreateAction)];
    const projectTypeDelete = actions[_.camelCase(projectTypeDeleteAction)];
    const projectTypeSetTool = actions[_.camelCase(projectTypeSetToolAction)];
    const projectTypeSetActivity = actions[_.camelCase(projectTypeSetActivityAction)];
    const projectTypeConfigure = actions[_.camelCase(projectTypeConfigureAction)];
    const projectTypeGarbageCollect = actions[_.camelCase(projectTypeGarbageCollectAction)];

    let defaultState = _.get(StoreInfo.store.getState(), 'app.local.projectTypes');
    defaultState = defaultState ? defaultState : {};

    let reducer = handleActions(
        {
            [projectTypeCreate]: (state, { payload: { uuid } }) => {
                let activities = {};
                _.forEach(Elaborate.Activities, activity => {
                    activities[activity.name] = 'null';
                });
                let tools = {};
                _.forEach(Elaborate.Tools, tool => {
                    tools[tool.name] = 'null';
                });
                let projectType = { deleted: false, name: 'Project Type Name', activities, tools };

                return Object.assign({}, state, {
                    [uuid]: projectType
                });
            },
            [projectTypeSetTool]: (state, { payload: { uuid, toolName, toolType } }) => {
                let tools = Object.assign({}, state[uuid].tools, { [toolName]: toolType });
                let projectType = Object.assign({}, state[uuid], { tools });
                return Object.assign({}, state, { [uuid]: projectType });
            },
            [projectTypeSetActivity]: (state, { payload: { uuid, activityName, activityType } }) => {
                let activities = Object.assign({}, state[uuid].activities, { [activityName]: activityType });
                let projectType = Object.assign({}, state[uuid], { activities });
                return Object.assign({}, state, { [uuid]: projectType });
            },
            [projectTypeConfigure]: (state, { payload: { uuid, data } }) => {
                let projectType = Object.assign({}, state[uuid], { deleted: false, ...data });
                return Object.assign({}, state, { [uuid]: projectType });
            },
            [projectTypeDelete]: (state, { payload: { uuid } }) => {
                let projectType = Object.assign({}, state[uuid], { deleted: true });
                return Object.assign({}, state, { [uuid]: projectType });
            },
            [projectTypeGarbageCollect]: state => {
                let newState = {};
                _.each(state, (projectType, uuid) => {
                    if (!projectType.deleted) {
                        newState[uuid] = projectType;
                    }
                });
                return newState;
            }
        },
        defaultState
    );

    injectReducer('app.local.projectTypes', reducer);
    Object.assign(reducer, actions);

    return reducer;
}

let _reducer = createprojectTypeReducer();

export default _reducer;
