import ProjectReducer from '../reducers/project';
import DocumentReducer from '../reducers/document';
import { select, takeEvery, fork, all, put, call } from 'redux-saga/effects';
import Factory from './factory.js';
import { runSaga } from '../store';
import _ from 'lodash';

const DEBUG = require('debug')('managers/controller');

function* processProject(action) {
    const uuid = action.payload.uuid;

    const project = yield select(_.get, `app.local.projects.${uuid}`);
    const manager = Factory.newManager(project.manager);

    if (manager) {
        yield call([manager, manager.processProject], uuid);
    } else {
        DEBUG('Manager ${project.manager} not found');
    }
}

/* Project watcher */
function* projectWatcher() {
    DEBUG('Watching projects');

    const projects = yield select(_.get, 'app.local.projects');
    for (let uuid in projects) {
        yield fork(processProject, { payload: { uuid } });
    }
    yield all([takeEvery(ProjectReducer.projectConfigureAction, processProject)]);
}

function* processProjectDelete(action) {
    const uuid = action.payload.uuid;

    const project = yield select(_.get, `app.local.projects.${uuid}`);
    if (!project.deleted) return;

    DEBUG(`Garbage collecting project ${uuid}`);
    yield put(DocumentReducer.documentProjectDelete(uuid));
    yield put(ProjectReducer.projectGarbageCollect(uuid));
}

function* projectDeleter() {
    DEBUG('Garbage collecting projects');

    const projects = yield select(_.get, 'app.local.projects');
    for (let uuid in projects) {
        yield fork(processProjectDelete, { payload: { uuid } });
    }
    yield all([takeEvery(ProjectReducer.projectDeleteAction, processProjectDelete)]);
}

runSaga(projectWatcher);
runSaga(projectDeleter);
