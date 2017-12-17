import Elaborate from './elaborate';


const initReducer = (state, action) => {
    /* Determine all documents with no sources */
    /* Force definition of some extra documents */
    return Object.assign({}, state, { percentComplete: 0 })
}

const setCompleteReducer = (state, action) => {
     return Object.assign({}, state, { percentComplete: action.percentComplete })
}

const documentReducer = (state, action) => {
    switch(action.type) {
        case 'DOCUMENT_INIT' : return initReducer(state, action);
        case 'DOCUMENT_SET_COMPLETE' : return setCompleteReducer(state, action);
        default: return state;
    }
};

export default documentReducer;
