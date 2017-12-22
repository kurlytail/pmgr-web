import { takeEvery, fork, select, all } from 'redux-saga/effects';
import Elaborate from '../elaborate';
import _ from 'lodash';
import ProjectReducer from '../reducers/project';
import { register } from './factory';

class Manager {
    *manageProject(action) {
        let state = yield select();
        _.get(state, `app.local.projects.${action.uuid}`);

        _.filter(Elaborate.Documents, document => !document.input || document.input.length === 0);
    }

    *initialize() {
        /* Check existing projects */
        let state = yield select();
        let projects = _.keys(_.get(state, 'app.local.projects'));

        for (var i in projects) {
            yield fork(this.manageProject.bind(this), { uuid: projects[i] });
        }

        yield all([takeEvery(ProjectReducer.projectConfigure, this.manageProject.bind(this))]);
    }
}

register('null', Manager);
