import { takeEvery, fork, select, all, call, put } from 'redux-saga/effects';
import Elaborate from '../elaborate';
import _ from 'lodash';
import ProjectReducer from '../reducers/project';
import DocumentReducer from '../reducers/document';
import ToolReducer from '../reducers/tool';
import ActivityReducer from '../reducers/activity';
import Factory from './factory';
import React from 'react';
import avatar from './null.svg';
const DEBUG = require('debug')('managers/null');

class Manager {
    config(uuid) {
        return <div />;
    }

    *processDocuments(uuid) {
        DEBUG(`processing documents for ${uuid}`);
        let allDocuments = yield select(_.get, `app.local.documents.${uuid}`);
        allDocuments = allDocuments || {};

        let inputDocs = Elaborate.Documents.filter(
            doc => (!doc.input || doc.input.length === 0) && !allDocuments[doc.name]
        );

        let allDocs = Elaborate.Documents.filter(doc => !allDocuments[doc.name]);

        yield all(allDocs.map(doc => put(DocumentReducer.documentCreate(uuid, doc.name))));
        yield all(
            inputDocs.map(doc =>
                put(DocumentReducer.documentConfigure(uuid, doc.name, { started: true, complete: false, progress: 0 }))
            )
        );
    }

    *processTools(uuid) {
        DEBUG(`processing tools for ${uuid}`);
        let allTools = yield select(_.get, `app.local.tools.${uuid}`);
        allTools = allTools || {};

        let tools = Elaborate.Tools.filter(tool => !allTools[tool.name]);

        yield all(tools.map(tool => put(ToolReducer.toolCreate(uuid, tool.name))));
        yield all(tools.map(tool => put(ToolReducer.toolConfigure(uuid, tool.name, { progress: 0 }))));
    }

    *processActivities(uuid) {
        DEBUG(`processing activities for ${uuid}`);
        let allActivities = yield select(_.get, `app.local.activities.${uuid}`);
        allActivities = allActivities || {};

        let activities = Elaborate.Activities.filter(activity => !allActivities[activity.name]);

        yield all(activities.map(activity => put(ActivityReducer.activityCreate(uuid, activity.name))));
        yield all(
            activities.map(activity => put(ActivityReducer.activityConfigure(uuid, activity.name, { progress: 0 })))
        );
    }

    *processProject(uuid) {
        let project = yield select(_.get, `app.local.projects.${uuid}`);

        DEBUG(`Null manager processing project ${uuid} -- ${project.name}`);

        /* Get the project type */
        yield select(_.get, `app.local.projectTypes.${project.type}`);
        yield call([this, this.processDocuments], uuid);
        yield call([this, this.processTools], uuid);
        yield call([this, this.processActivities], uuid);
    }

    avatar(dim = 100) {
        return <img src={avatar} height={dim} width={dim} />;
    }
}

export default Manager;
