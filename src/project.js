import Elaborate from './elaborate';
import _ from 'lodash';
import Tracer from 'tracer';
const Logger = Tracer.colorConsole();

const initReducer = (state, action) => {
    /* Determine all documents with no sources */
    let projectInputs = _.filter(Elaborate.Documents, document => !document.input || document.input.length === 0);
    let documents = {};

    _.forEach(projectInputs, input => (documents[input.name] = {}));

    return Object.assign({}, state, { documents });
};

const finalizeReducer = (state, action) => {
    var documents = {};
    _.forEach(state.documents, (document, key) => {
        documents[key] = Object.assign({}, document, { percentComplete: 100 });
    });
    return Object.assign({}, state, { documents });
};

const projectReducer = (state, action) => {
    switch (action.type) {
        case 'PROJECT_INIT':
            return initReducer(state, action);
        case 'PROJECT_FINALIZE':
            return finalizeReducer(state, action);
        default:
            return state;
    }
};

export default projectReducer;
