import _ from 'lodash';
import { injectReducer } from '../store';
import { createActions, handleActions } from 'redux-actions';

const STATE_PATH = 'app.local.documents';

function createDocumentReducer() {
    let actionNames = {
        documentCreateAction: 'DOCUMENT_CREATE',
        documentDeleteAction: 'DOCUMENT_DELETE',
        documentProjectDeleteAction: 'DOCUMENT_PROJECT_DELETE',
        documentConfigureAction: 'DOCUMENT_CONFIGURE',
        documentGarbageCollectAction: 'DOCUMENT_GARBAGE_COLLECT'
    };

    const actions = createActions({
        [actionNames.documentCreateAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.documentConfigureAction]: (uuid, name, data) => ({ uuid, name, data }),
        [actionNames.documentDeleteAction]: (uuid, name) => ({ uuid, name }),
        [actionNames.documentGarbageCollectAction]: uuid => ({ uuid }),
        [actionNames.documentProjectDeleteAction]: uuid => ({ uuid })
    });

    const documentCreate = actions[_.camelCase(actionNames.documentCreateAction)];
    const documentConfigure = actions[_.camelCase(actionNames.documentConfigureAction)];
    const documentDelete = actions[_.camelCase(actionNames.documentDeleteAction)];
    const documentGarbageCollect = actions[_.camelCase(actionNames.documentGarbageCollectAction)];
    const documentProjectDelete = actions[_.camelCase(actionNames.documentProjectDeleteAction)];

    let reducer = handleActions(
        {
            [documentCreate]: (state, { payload: { uuid, name } }) => {
                let newDocument = { deleted: false, name: _.startCase(name) };
                let documents = Object.assign({}, state[uuid], { [name]: newDocument });
                return Object.assign({}, state, {
                    [uuid]: documents
                });
            },
            [documentConfigure]: (state, { payload: { uuid, name, data } }) => {
                let newDocument = Object.assign({}, state[uuid][name], { deleted: false, ...data });
                let documents = Object.assign({}, state[uuid], { [name]: newDocument });
                return Object.assign({}, state, { [uuid]: documents });
            },
            [documentDelete]: (state, { payload: { uuid, name } }) => {
                let newDocument = Object.assign({}, state[uuid][name], { deleted: true });
                let documents = Object.assign({}, state[uuid], { [name]: newDocument });
                return Object.assign({}, state, { [uuid]: documents });
            },
            [documentGarbageCollect]: (state, { payload: { uuid } }) => {
                let documents = {};
                _.each(state[uuid], (doc, name) => {
                    if (!doc.deleted) {
                        documents[name] = doc;
                    }
                });
                return Object.assign({}, state, { [uuid]: documents });
            },
            [documentProjectDelete]: (state, { payload: { uuid } }) => {
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

let _reducer = createDocumentReducer();

export default _reducer;
