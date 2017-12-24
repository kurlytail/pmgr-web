import { takeEvery, fork, select, all } from 'redux-saga/effects';
import Elaborate from '../elaborate';
import _ from 'lodash';
import ProjectReducer from '../reducers/project';
import { register } from './factory';
import React from 'react';
import avatar from './null.svg';

class Manager {

    config(project) {}

    *processProject(project) {}

    avatar(dim = 100) {
        return <img src={avatar} height={dim} width={dim} />;
    }

}

register('null', Manager);
