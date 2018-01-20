import ProjectReducer from '../reducers/project';
import DocumentReducer from '../reducers/document';
import { select, takeEvery, fork, all, put, call } from 'redux-saga/effects';
import { newManager } from './factory.js';
import { runSaga } from '../store';
import _ from 'lodash';

var DEBUG = require('debug')('managers/controller');

function* processProject(action) {
    let uuid = action.payload.uuid;

    let project = yield select(_.get, `app.local.projects.${uuid}`);
    let manager;

    if (project.manager) {
        manager = newManager(project.manager);
    }

    if (manager) {
        yield call([manager, manager.processProject], uuid);
    } else {
        DEBUG('Manager ${project.manager} not found');
    }
}

/* Project watcher */
function* projectWatcher() {
    DEBUG('Watching projects');

    let projects = yield select(_.get, 'app.local.projects');
    for (var uuid in projects) {
        yield fork(processProject, { payload: { uuid } });
    }
    yield all([takeEvery(ProjectReducer.projectConfigureAction, processProject)]);
}

function* processProjectDelete(action) {
    let uuid = action.payload.uuid;

    let project = yield select(_.get, `app.local.projects.${uuid}`);
    if (!project.deleted) return;

    DEBUG(`Garbage collecting project ${uuid}`);
    yield put(DocumentReducer.documentProjectDelete(uuid));
    yield put(ProjectReducer.projectGarbageCollect(uuid));
}

function* projectDeleter() {
    DEBUG('Garbage collecting projects');

    let projects = yield select(_.get, 'app.local.projects');
    for (var uuid in projects) {
        yield fork(processProjectDelete, { payload: { uuid } });
    }
    yield all([takeEvery(ProjectReducer.projectDeleteAction, processProjectDelete)]);
}

runSaga(projectWatcher);
runSaga(projectDeleter);
