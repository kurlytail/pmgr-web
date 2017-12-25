import ProjectReducer from '../reducers/project.js';
import { call, select, takeLatest, fork, all } from 'redux-saga/effects';
import { newManager } from './factory.js';
import { runSaga } from '../store';
import _ from 'lodash';

var DEBUG = require('debug')('managers/controller');

function* processProject(action) {
    let uuid = action.payload.uuid;
    DEBUG(`Processing project ${uuid}`);

    let state = yield select();
    let project = _.get(state, `app.local.projects.${uuid}`);
    var manager;

    if (project.manager) {
        manager = newManager(project.manager);
    }

    if (manager) {
        yield call(manager.processProject, uuid);
    }
}

/* Project watcher */
function* projectWatcher() {
    DEBUG('Watching projects');

    let state = yield select();
    for (var uuid in _.get(state, 'app.local.projects')) {
        yield fork(processProject, { payload: { uuid } });
    }
    yield all(takeLatest(ProjectReducer.projectConfigure, processProject));
}

runSaga(projectWatcher);
