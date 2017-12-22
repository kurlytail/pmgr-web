import { select } from 'redux-saga/effects';
import { register } from './factory';

class Manager {
    *initialize() {
        yield select();
    }
}

register('oracle', Manager);
