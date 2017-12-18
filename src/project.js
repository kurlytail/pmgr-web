import _ from 'lodash';

const initReducer = (state) => {
    return Object.assign({}, state);
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
            return state;
    }
};

export default projectReducer;
