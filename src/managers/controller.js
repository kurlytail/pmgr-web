import ProjectReducer from '../reducers/project';
import DocumentReducer from '../reducers/document';
import ToolReducer from '../reducers/tool';
import ActivityReducer from '../reducers/activity';
import ProcessGroupReducer from '../reducers/process-group';
import { select, takeEvery, fork, all, put, call } from 'redux-saga/effects';
import Factory from './factory.js';
import { runSaga } from '../store';
import _ from 'lodash';
import Schema from '../schema';

const DEBUG = require('debug')('managers/controller');

class Controller {
    *processTool(action) {
        const uuid = action.payload.uuid;

        const project = yield select(_.get, `app.local.projects.${uuid}`);
        const manager = Factory.newManager(project.manager);

        if (manager && manager.processTools) {
            yield call([manager, manager.processTools], uuid);
        }
    }

    *processActivity(action) {
        const uuid = action.payload.uuid;

        const project = yield select(_.get, `app.local.projects.${uuid}`);
        const manager = Factory.newManager(project.manager);

        if (manager && manager.processActivities) {
            yield call([manager, manager.processActivities], uuid);
        }
    }

    *processDocument(action) {
        const uuid = action.payload.uuid;

        const project = yield select(_.get, `app.local.projects.${uuid}`);
        const manager = Factory.newManager(project.manager);

        if (manager && manager.processDocuments) {
            yield call([manager, manager.processDocuments], uuid);
        }
    }

    *_enforceProjectDocumentInvariants(uuid) {
        let allDocuments = yield select(_.get, `app.local.documents.${uuid}`);
        allDocuments = allDocuments || {};

        let inputDocs = Schema.Document.documents.filter(
            doc => (!doc.input || doc.input.length === 0) && !allDocuments[doc.name]
        );

        let allDocs = Schema.Document.documents.filter(doc => !allDocuments[doc.name]);

        yield all(allDocs.map(doc => put(DocumentReducer.documentCreate(uuid, doc.name))));
        yield all(
            inputDocs.map(doc =>
                put(DocumentReducer.documentConfigure(uuid, doc.name, { started: true, complete: false, progress: 0 }))
            )
        );
    }

    *_enforceProjectToolInvariants(uuid) {
        DEBUG(`processing tools for ${uuid}`);
        let allTools = yield select(_.get, `app.local.tools.${uuid}`);
        allTools = allTools || {};

        let tools = Schema.Tool.tools.filter(tool => !allTools[tool.name]);

        yield all(tools.map(tool => put(ToolReducer.toolCreate(uuid, tool.name))));
        yield all(tools.map(tool => put(ToolReducer.toolConfigure(uuid, tool.name, { progress: 0 }))));
    }

    *_enforceProjectActivityInvariants(uuid) {
        DEBUG(`processing activities for ${uuid}`);
        let allActivities = yield select(_.get, `app.local.activities.${uuid}`);
        allActivities = allActivities || {};

        let activities = Schema.Activity.activities.filter(activity => !allActivities[activity.name]);

        yield all(activities.map(activity => put(ActivityReducer.activityCreate(uuid, activity.name))));
        yield all(
            activities.map(activity => put(ActivityReducer.activityConfigure(uuid, activity.name, { progress: 0 })))
        );
    }

    *_enforceProjectProcessGroupInvariants(uuid) {
        DEBUG(`processing processGroups for ${uuid}`);
        let allProcessGroups = yield select(_.get, `app.local.processGroups.${uuid}`);
        allProcessGroups = allProcessGroups || {};

        let processGroups = Schema.ProcessGroup.processGroups.filter(
            processGroup => !allProcessGroups[processGroup.name]
        );

        yield all(
            processGroups.map(processGroup => put(ProcessGroupReducer.processGroupCreate(uuid, processGroup.name)))
        );
        yield all(
            processGroups.map(processGroup =>
                put(ProcessGroupReducer.processGroupCreate(uuid, processGroup.name, { progress: 0 }))
            )
        );
    }

    *processProject(action) {
        const uuid = action.payload.uuid;
        DEBUG(`Managing ${uuid}`);

        const project = yield select(_.get, `app.local.projects.${uuid}`);

        yield call([this, this._enforceProjectDocumentInvariants], uuid);
        yield call([this, this._enforceProjectToolInvariants], uuid);
        yield call([this, this._enforceProjectActivityInvariants], uuid);
        yield call([this, this._enforceProjectProcessGroupInvariants], uuid);

        const manager = Factory.newManager(project.manager);
        if (manager && manager.processProject) {
            yield call([manager, manager.processProject], uuid);
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
