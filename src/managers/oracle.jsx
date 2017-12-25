import { select } from 'redux-saga/effects';
import { register } from './factory';
import React from 'react';
import avatar from './oracle.svg';
var DEBUG = require('debug')('managers/oracle');

class Manager {

    *processProject(uuid) {
        let state = yield select();
        let project = _.get(state, `app.local.projects.${uuid}`);

        DEBUG(`Oracle processing project ${uuid} -- ${project.name}`);
    }
    config(project) {

    }

    avatar(dim = 100) {
        return <img src={avatar} height={dim} width={dim} />;
    }
}

register('oracle', Manager);
