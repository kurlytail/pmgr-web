import _ from 'lodash';
import { injectReducer } from '../store';
import { createActions, handleActions } from 'redux-actions';
import generateName from 'project-name-generator';
import uuid from 'uuid/v4';
import Schema from '../schema';

const STATE_PATH = 'app.local.projectTypes';
const NULL_UUID = '00000000-0000-0000-0000-000000000000';

function createprojectTypeReducer() {
    let actionNames = {
        projectTypeCreateAction: 'PROJECT_TYPE_CREATE',
        projectTypeDeleteAction: 'PROJECT_TYPE_DELETE',
        projectTypeSetToolAction: 'PROJECT_TYPE_SET_TOOL',
        projectTypeSetActivityAction: 'PROJECT_TYPE_SET_ACTIVITY',
        projectTypeConfigureAction: 'PROJECT_TYPE_CONFIGURE',
        projectTypeGarbageCollectAction: 'PROJECT_TYPE_GARBAGE_COLLECT'
    };

    const actions = createActions({
        [actionNames.projectTypeCreateAction]: uuid => ({ uuid }),
        [actionNames.projectTypeSetToolAction]: (uuid, toolName, toolType) => ({ uuid, toolName, toolType }),
        [actionNames.projectTypeSetActivityAction]: (uuid, activityName, activityType) => ({
            uuid,
            activityName,
            activityType
        }),
        [actionNames.projectTypeConfigureAction]: (uuid, data) => ({ uuid, data }),
        [actionNames.projectTypeDeleteAction]: uuid => ({ uuid }),
        [actionNames.projectTypeGarbageCollectAction]: () => {}
    });

    const projectTypeCreate = actions[_.camelCase(actionNames.projectTypeCreateAction)];
    const projectTypeDelete = actions[_.camelCase(actionNames.projectTypeDeleteAction)];
    const projectTypeSetTool = actions[_.camelCase(actionNames.projectTypeSetToolAction)];
    const projectTypeSetActivity = actions[_.camelCase(actionNames.projectTypeSetActivityAction)];
    const projectTypeConfigure = actions[_.camelCase(actionNames.projectTypeConfigureAction)];
    const projectTypeGarbageCollect = actions[_.camelCase(actionNames.projectTypeGarbageCollectAction)];

    let reducer = handleActions(
        {
            [projectTypeCreate]: state => {
                let activities = {};
                _.forEach(Schema.Activity.activities, activity => {
                    activities[activity.name] = 'ignore';
                });
                let tools = {};
                _.forEach(Schema.Tool.tools, tool => {
                    tools[tool.name] = 'ignore';
                });

                let projectTypeName =
                    Object.keys(state).length === 0 ? 'default-type' : `${generateName().dashed}-type`;
                let projectTypeUUID = Object.keys(state).length === 0 ? NULL_UUID : uuid();
                let projectType = { deleted: false, name: projectTypeName, activities, tools };

                return Object.assign({}, state, {
                    [projectTypeUUID]: projectType
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
        _.get(localStorage.getItem('pmgr'), STATE_PATH) || {}
    );

    injectReducer(STATE_PATH, reducer);
    Object.assign(reducer, actions, actionNames);

    return reducer;
}

let _reducer = createprojectTypeReducer();

export default _reducer;
