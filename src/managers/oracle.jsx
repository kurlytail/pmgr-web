import { select } from 'redux-saga/effects';
import { register } from './factory';
import React from 'react';
import avatar from './oracle.svg';

class Manager {
    *initialize() {
        yield select();
    }

    avatar(dim = 100) {
        return <img src={avatar} height={dim} width={dim} />;
    }
}

register('oracle', Manager);
