import _ from 'lodash';
import DocumentReducer from './document';
import { injectReducer } from './store';
import uuidGen from 'uuid/v4';
import { runSaga } from './store';

const initReducer = (state, action) => {
    return Object.assign({}, state, { name: action.name });
};

const finalizeReducer = state => {
    var documents = {};
    _.forEach(state.documents, (document, key) => {
        documents[key] = Object.assign({}, document, { percentComplete: 100 });
    });
    return Object.assign({}, state, { documents });
};

const projectReducer = (state, action) => {
    switch (action.type) {
        case 'PROJECT_INIT':
            return initReducer(state, action);
        case 'PROJECT_FINALIZE':
            return finalizeReducer(state, action);
        default:
            return DocumentReducer(state, action);
    }
};

const createProject = (state, action) => {
    let uuid = action.uuid;
    state = _.union(state, [uuid]);
    return state;
};

const deleteProject = (state, action) => {
    let uuid = action.uuid;
    state = _.difference(state, [uuid]);
    return state;
};

const projectListReducer = (state, action) => {
    switch (action.type) {
        case 'PROJECT_LIST_CREATE':
            return createProject(state, action);
        case 'PROJECT_LIST_DELETE':
            return deleteProject(state, action);
        default:
            return state;
    }
};

function* projectCreator(action) {
    yield put({ type: 'PROJECT_INIT', name: 'SampleProject', uuid: action.uuid });
}

function* projectDeleter(action) {
    yield put({ type: 'PROJECT_INIT', uuid: action.uuid });
}

runSaga(function*() {
    yield [takeEvery('PROJECT_LIST_CREATE', projectCreator), takeEvery('PROJECT_LIST_DELETE', projectDeleter)];
});

injectReducer('app.local.project.list', projectListReducer);
