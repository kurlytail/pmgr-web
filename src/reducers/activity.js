import _ from 'lodash';
import { injectReducer } from '../store';
import { createActions, handleActions } from 'redux-actions';

const STATE_PATH = 'app.local.activities';

function createActivityReducer() {
    const actionNames = {
        activityCreateAction: 'ACTIVITY_CREATE',
        activityDeleteAction: 'ACTIVITY_DELETE',
        activityProjectDeleteAction: 'ACTIVITY_PROJECT_DELETE',
        activityConfigureAction: 'ACTIVITY_CONFIGURE',
        activityGarbageCollectAction: 'ACTIVITY_GARBAGE_COLLECT'
    };

    const actions = createActions({
        [actionNames.activityCreateAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.activityConfigureAction]: (uuid, name, data) => ({ uuid, name, data }),
        [actionNames.activityDeleteAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.activityGarbageCollectAction]: uuid => ({ uuid }),
        [actionNames.activityProjectDeleteAction]: uuid => ({ uuid })
    });

    const activityCreate = actions[_.camelCase(actionNames.activityCreateAction)];
    const activityConfigure = actions[_.camelCase(actionNames.activityConfigureAction)];
    const activityDelete = actions[_.camelCase(actionNames.activityDeleteAction)];
    const activityGarbageCollect = actions[_.camelCase(actionNames.activityGarbageCollectAction)];
    const activityProjectDelete = actions[_.camelCase(actionNames.activityProjectDeleteAction)];

    let reducer = handleActions(
        {
            [activityCreate]: (state, { payload: { uuid, name } }) => {
                let newActivity = { deleted: false, name: 'Activity Name' };
                let activities = Object.assign({}, state[uuid], { [name]: newActivity });
                return Object.assign({}, state, {
                    [uuid]: activities
                });
            },
            [activityConfigure]: (state, { payload: { uuid, name, data } }) => {
                let newActivity = Object.assign({}, (state[uuid][name]: { deleted: false, ...data }));
                let activities = Object.assign({}, state[uuid], { [name]: newActivity });
                return Object.assign({}, state, { [uuid]: activities });
            },
            [activityDelete]: (state, { payload: { uuid, name } }) => {
                let newActivity = Object.assign({}, (state[uuid][name]: { deleted: true }));
                let activities = Object.assign({}, state[uuid], { [name]: newActivity });
                return Object.assign({}, state, { [uuid]: activities });
            },
            [activityGarbageCollect]: (state, { payload: { uuid } }) => {
                let activities = {};
                _.each(state[uuid], (doc, name) => {
                    if (!doc.deleted) {
                        activities[name] = doc;
                    }
                });
                return Object.assign({}, state, { [uuid]: activities });
            },
            [activityProjectDelete]: (state, { payload: { uuid } }) => {
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

const _reducer = createActivityReducer();

export default _reducer;
