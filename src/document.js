//import Elaborate from './elaborate';
//
const createDocument = (state, action) => {
    if (!state.documents) {
        let documents = {};
        state = Object.assign({}, state, { documents });
    }

    if (!state.documents[action.name]) {
        let documents = Object.assign({}, state.documents, { [action.name]: { percentComplete: 0 } });
        state = Object.assign({}, state, { documents });
    }

    return state;
};

const initReducer = (state, action) => {
    return createDocument(state, action);
};

const setCompleteReducer = (state, action) => {
    state = createDocument(state, action);

    let doc = Object.assign({}, state.documents[action.name], { percentComplete: action.percentComplete });
    let documents = Object.assign({}, state.documents, { [action.name]: doc });
    return Object.assign({}, state, { documents });
};

const documentReducer = (state, action) => {
    switch (action.type) {
        case 'DOCUMENT_INIT':
            return initReducer(state, action);
        case 'DOCUMENT_UPDATE':
            return setCompleteReducer(state, action);
        default:
            return state;
    }
};

export default documentReducer;
