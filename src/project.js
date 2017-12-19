import _ from 'lodash';
import DocumentReducer from './document';

const initReducer = (state, action) => {
    return Object.assign({}, state, { name: action.name });
};

const finalizeReducer = state => {
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
            return DocumentReducer(state, action);
    }
};

export default projectReducer;
