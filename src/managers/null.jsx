import { takeEvery, fork, select, all, call, put } from 'redux-saga/effects';
import Elaborate from '../elaborate';
import _ from 'lodash';
import ProjectReducer from '../reducers/project';
import DocumentReducer from '../reducers/document';
import { register } from './factory';
import React from 'react';
import avatar from './null.svg';
var DEBUG = require('debug')('managers/null');

class Manager {
    config(uuid) {
        return <div />;
    }

    *getCompletedDocuments(uuid) {
        let allDocuments = yield select(_.get, `app.local.documents.${uuid}`);

        /* Get documents that are not generated, or have been marked complete */
        var documents = _.pickBy(allDocuments, value => {
            if (value.complete === 100) return true;
            return false;
        });

        /* Create documents with no inputs and if they are not already part of the documents list */
        let inputDocs = _.filter(
            Elaborate.Documents,
            doc => (!doc.input || doc.input.length === 0) && !documents[doc.name]
        );

        /* Create input documents */
        for (var i in inputDocs) {
            let doc = inputDocs[i];

            yield put(DocumentReducer.documentCreate(uuid, doc.name));
            yield put(DocumentReducer.documentConfigure(uuid, doc.name, { complete: 100 }));
        }

        allDocuments = yield select(_.get, `app.local.documents.${uuid}`);

        /* Get documents that are not generated, or have been marked complete */
        documents = _.pickBy(allDocuments, value => {
            if (value.complete === 100) return true;
            return false;
        });

        /* Find activities that can make progress */
        let completedDocuments = _.keys(documents);
        var activities = [];

        _.forEach(Elaborate.Activities, activity => {
            DEBUG(activity);
            let inputDocuments = _.map(activity.input, 'from');
            DEBUG(inputDocuments);
            inputDocuments = _.map(_.filter(inputDocuments, doc => doc.name.indexOf('tool_') !== 0), 'name');
            if(_.intersection(inputDocuments, completedDocuments).length === inputDocuments.length) {
                activities.push(activity);
            }
        });

        DEBUG(activities);

        return documents;
    }

    *processProject(uuid) {
        let project = yield select(_.get, `app.local.projects.${uuid}`);

        DEBUG(`Null manager processing project ${uuid} -- ${project.name}`);

        /* Get the project type */
        let type = yield select(_.get, `app.local.projectTypes.${project.type}`);
        let documents = yield call([this, this.getCompletedDocuments], uuid);

        /* Get all possible activities to run */
    }

    avatar(dim = 100) {
        return <img src={avatar} height={dim} width={dim} />;
    }
}

register('null', Manager);
