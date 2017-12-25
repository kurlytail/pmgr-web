import { takeEvery, fork, select, all } from 'redux-saga/effects';
import Elaborate from '../elaborate';
import _ from 'lodash';
import ProjectReducer from '../reducers/project';
import { register } from './factory';
import React from 'react';
import avatar from './null.svg';
var DEBUG = require('debug')('managers/null');

class Manager {
    config(uuid) {}

    *processProject(uuid) {
        let project = yield select(_.get, `app.local.projects.${uuid}`);

        DEBUG(`Null manager processing project ${uuid} -- ${project.name}`);
    }

    avatar(dim = 100) {
        return <img src={avatar} height={dim} width={dim} />;
    }
}

register('null', Manager);
