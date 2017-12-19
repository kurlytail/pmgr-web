import { takeEvery, put } from 'redux-saga/effects';
import Elaborate from '../elaborate';
import _ from 'lodash';

function* initializeProject() {
    let projectInputs = _.filter(Elaborate.Documents, document => !document.input || document.input.length === 0);

    for (let i in projectInputs) {
        yield put({ type: 'DOCUMENT_INIT', name: projectInputs[i].name });
    }
}

function* analyzeDocument(action) {}

function* initialize() {
    yield [
        takeEvery('PROJECT_INIT', initializeProject),
        takeEvery('DOCUMENT_INIT', analyzeDocument),
        takeEvery('DOCUMENT_UPDATE', analyzeDocument)
    ];
}

export default initialize;
export { initializeProject, analyzeDocument };
