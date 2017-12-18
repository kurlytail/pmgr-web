import { takeEvery } from 'redux-saga/effects';
import Elaborate from '../elaborate';
import Tracer from 'tracer';
const Logger = Tracer.colorConsole();

function* initializeDocuments() {
    Logger.info('Initializing documents in new project')
        /* Determine all documents with no sources */
    let projectInputs = _.filter(Elaborate.Documents, document => !document.input || document.input.length === 0);
    let documents = {};

    _.forEach(projectInputs, input => (documents[input.name] = {}));
    for(let i in documents) {
        yield put({type: 'DOCUMENT_INIT'})
    }
}

function* managerSaga() {
    Logger.info('Starting generic manager');
    do {
        yield takeEvery('PROJECT_INIT', initializeDocuments);
    } while (true);
}

export default managerSaga;
