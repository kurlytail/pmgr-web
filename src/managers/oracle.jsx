import { select } from 'redux-saga/effects';
import Factory from './factory';
import React from 'react';
import avatar from './oracle.svg';
var DEBUG = require('debug')('managers/oracle');

class Manager {
    *processProject(uuid) {
        let project = yield select(_.get, `app.local.projects.${uuid}`);

        DEBUG(`Oracle processing project ${uuid} -- ${project.name}`);
    }

    config(project) {
        return (
            <div>
                <h2>I dont know enough about the project yet</h2>
            </div>
        );
    }

    avatar(dim = 100) {
        return <img src={avatar} height={dim} width={dim} />;
    }
}

Factory.register('oracle', Manager);
