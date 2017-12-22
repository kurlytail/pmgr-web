import _ from 'lodash';
import { injectReducer, StoreInfo } from '../store';
import { createActions, handleActions } from 'redux-actions';

function createProjectReducer(uuid) {
    const projectInitAction = `PROJECT_${uuid}_INIT`;
    const projectDeleteAction = `PROJECT_${uuid}_DELETE`;
    const actions = createActions({
        [projectInitAction]: (uuid, name) => ({ uuid, name }),
        [projectDeleteAction]: uuid => ({ uuid })
    });

    const projectInit = actions[_.camelCase(projectInitAction)];
    const projectDelete = actions[_.camelCase(projectDeleteAction)];

    let reducer = handleActions(
        {
            [projectInit]: (state, { payload: { uuid } }) => {
                return Object.assign({}, state, { [uuid]: { deleted: false, name } });
            },
            [projectDelete]: (state, { payload: { uuid } }) => {
                let project = Object.assign({}, state[uuid], { deleted: true });
                return Object.assign({}, state, { [uuid]: project });
            }
        },
        {}
    );

    injectReducer(`app.local.${uuid}`, reducer);
    Object.assign(reducer, actions);

    return reducer;
}

function projectInit() {
    let state = StoreInfo.store;
    let uuids = _.keys(_.get(state, 'app.local.projects'));
    _.forEach(uuids, uuid => {
        createProjectReducer(uuid);
    });
}


projectInit();
export default createProjectReducer;
