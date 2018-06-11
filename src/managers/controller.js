import ProjectReducer from '../reducers/project';
import DocumentReducer from '../reducers/document';
import ToolReducer from '../reducers/tool';
import ActivityReducer from '../reducers/activity';
import { select, takeEvery, fork, all, put, call } from 'redux-saga/effects';
import Factory from './factory.js';
import { runSaga } from '../store';
import _ from 'lodash';

const DEBUG = require('debug')('managers/controller');

class Controller {
    *processTool(action) {
        const uuid = action.payload.uuid;

        const project = yield select(_.get, `app.local.projects.${uuid}`);
        const manager = Factory.newManager(project.manager);

        /* Implement tool invariants if any */

        if (manager) {
            yield call([manager, manager.processTools], uuid);
        } else {
            DEBUG('Manager ${manager} not found');
        }
    }

    *processActivity(action) {
        const uuid = action.payload.uuid;

        const project = yield select(_.get, `app.local.projects.${uuid}`);
        const manager = Factory.newManager(project.manager);

        if (manager) {
            yield call([manager, manager.processActivities], uuid);
        } else {
            DEBUG('Manager ${manager} not found');
        }
    }

    *processDocument(action) {
        const uuid = action.payload.uuid;

        const project = yield select(_.get, `app.local.projects.${uuid}`);
        const manager = Factory.newManager(project.manager);

        if (manager) {
            yield call([manager, manager.processDocuments], uuid);
        } else {
            DEBUG('Manager ${manager} not found');
        }
    }

    *processProject(action) {
        const uuid = action.payload.uuid;
        DEBUG(`Managing ${uuid}`);

        const project = yield select(_.get, `app.local.projects.${uuid}`);
        const manager = Factory.newManager(project.manager);

        if (manager) {
            yield call([manager, manager.processProject], uuid);
        } else {
            DEBUG('Manager ${project.manager} not found');
        }
    }

    /* Project watcher */
    *projectWatcher() {
        DEBUG('Watching projects');

        const projects = yield select(_.get, 'app.local.projects');
        for (let uuid in projects) {
            yield fork(this.processProject, { payload: { uuid } });
        }
        yield all([
            takeEvery(ProjectReducer.projectConfigureAction, this.processProject),
            takeEvery(ProjectReducer.projectCreateAction, this.processProject),
            takeEvery(DocumentReducer.documentConfigureAction, this.processDocument),
            takeEvery(ToolReducer.toolConfigureAction, this.processTool),
            takeEvery(ActivityReducer.activityConfigureAction, this.processActivity)
        ]);
    }

    *processProjectDelete(action) {
        const uuid = action.payload.uuid;

        const project = yield select(_.get, `app.local.projects.${uuid}`);
        if (!project.deleted) return;

        DEBUG(`Garbage collecting project ${uuid}`);
        yield put(DocumentReducer.documentProjectDelete(uuid));
        yield put(ActivityReducer.activityProjectDelete(uuid));
        yield put(ToolReducer.toolProjectDelete(uuid));
        yield put(ProjectReducer.projectGarbageCollect(uuid));
    }

    *projectDeleter() {
        const projects = yield select(_.get, 'app.local.projects');
        for (let uuid in projects) {
            yield fork(this.processProjectDelete, { payload: { uuid } });
        }
        yield all([takeEvery(ProjectReducer.projectDeleteAction, this.processProjectDelete)]);
    }

    constructor() {
        this.projectDeleter = this.projectDeleter.bind(this);
        this.projectWatcher = this.projectWatcher.bind(this);
        this.processProjectDelete = this.processProjectDelete.bind(this);
        this.processProject = this.processProject.bind(this);
        this.processDocument = this.processDocument.bind(this);
        this.processTool = this.processTool.bind(this);
        this.processActivity = this.processActivity.bind(this);
    }

    init() {
        runSaga(this.projectWatcher);
        runSaga(this.projectDeleter);
    }
}

export default Controller;
