import { takeEvery, fork, select, all, call, put } from 'redux-saga/effects';
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

    *processProject(uuid) {
        let project = yield select(_.get, `app.local.projects.${uuid}`);
        DEBUG(`Null manager processing project ${uuid} -- ${project.name}`);

        /* Get the project type */
        yield select(_.get, `app.local.projectTypes.${project.type}`);
    }

    avatar(dim = 100) {
        return <img src={avatar} height={dim} width={dim} />;
    }
}

export default Manager;
